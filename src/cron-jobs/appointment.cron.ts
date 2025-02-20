import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentStatus } from 'src/appointment/appointment.entity';
import { AppointmentsService } from 'src/appointment/appointment.service';
import { NotificationsService } from 'src/notification/notifications.service';
import { Categories } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class AppointmentCronService {
  private readonly logger = new Logger(AppointmentCronService.name);

  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly notificationsService: NotificationsService,
    private readonly servicesService: ServiceService,
    private productService: ProductService
  ) { }

  @Cron('*/10 * * * * *')
  async checkAndCompleteAppointments() {
    this.logger.log('Checking appointments to update their status...');
    try {
      // Obtener citas pendientes cuya fecha ya pasó
      const appointmentsToComplete = await this.appointmentService.findPendingPastAppointments();
      if (appointmentsToComplete.length === 0) {
        this.logger.log('No appointments to complete.');
        return;
      }
      
      const appointmentIds = appointmentsToComplete.map(a => a.id);
      this.logger.log(`Updating appointments to completed: IDs: ${appointmentIds}`);
      
      // Actualizar solo el estado de las citas
      await this.appointmentService.updateBulkStatusOnly(appointmentIds, AppointmentStatus.Completada);
      
      // Recuperar citas con sus servicios y productUsages
      const appointmentsWithServices = await this.appointmentService.getAppointmentsWithServicesByIds(appointmentIds);
      
      // Procesar cada cita y actualizar los productos asociados directamente
      for (const appointment of appointmentsWithServices) {
        this.logger.log(`Processing appointment ${appointment.id} for product updates`);
        
        for (const service of appointment.service) {
          this.logger.log(`Processing service ${service.id} with product usages: ${JSON.stringify(service.productUsages)}`);
          
          if (service.productUsages && service.productUsages.length > 0) {
            for (const usage of service.productUsages) {
              const prodId = usage.productId;
              const usageQuantity = usage.quantity;
              this.logger.log(`Processing product ${prodId} for service ${service.id} (quantity to reduce: ${usageQuantity})`);
              try {
                const product = await this.productService.getOneProduct(prodId);
                if (product) {
                  if (product.categoryProduct.toUpperCase() === "INSTRUMENTAL") {
                    this.logger.log(`Directly updating product ${prodId}: setting instrumentalState to false`);
                    const updatedProduct = await product.update({ instrumentalState: false });
                    this.logger.log(`Product ${prodId} updated, instrumentalState: ${updatedProduct.instrumentalState}`);
                  } else if (product.categoryProduct.toUpperCase() === "DISPOSABLE") {
                    this.logger.log(`Directly updating product ${prodId}: reducing quantity by ${usageQuantity} for disposable`);
                    if (product.quantity >= usageQuantity) {
                      const updatedProduct = await product.update({ quantity: product.quantity - usageQuantity });
                      this.logger.log(`Product ${prodId} updated, new quantity: ${updatedProduct.quantity}`);
                    } else {
                      const deletedProduct = await product.destroy();
                      this.logger.log(`Product ${prodId} destroyed due to insufficient quantity`);
                    }
                  } else if (product.categoryProduct.toUpperCase() === "QUIMICO") {
                    this.logger.log(`Directly updating product ${prodId}: reducing quantity by ${usageQuantity} for chemical`);
                    const updatedProduct = await product.update({ quantity: product.quantity - usageQuantity });
                    this.logger.log(`Product ${prodId} updated, new quantity: ${updatedProduct.quantity}`);
                  }
                } else {
                  this.logger.warn(`Product ${prodId} not found.`);
                }
              } catch (error) {
                this.logger.error(`Error processing product ${prodId}: ${error.message}`, error.stack);
              }
            }
          } else {
            this.logger.log(`Service ${service.id} in appointment ${appointment.id} has no product usages to process.`);
          }
        }
        
        // Enviar notificación al frontend sobre la cita completada
        this.notifyFrontend(appointment, 'completed');
      }
    } catch (error) {
      this.logger.error('Error updating appointments:', error.message, error.stack);
    }
  }
  
  
  @Cron('*/10 * * * * *')
  async notifyUpcomingAppointments() {
    this.logger.log('Checking for upcoming appointments in the next two days...');
    try {
      const appointments = await this.appointmentService.getAppointments();
      const today = new Date();

      const upcomingAppointments = appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const timeDiff = appointmentDate.getTime() - today.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return daysDiff >= 0 && daysDiff <= 1;
      });

      this.logger.log(`Upcoming appointments to notify: ${JSON.stringify(upcomingAppointments)}`);

      upcomingAppointments.forEach(appointment => {
        this.notifyFrontend(appointment, 'upcoming');
      });
    } catch (error) {
      this.logger.error('Error notifying upcoming appointments:', error.message, error.stack);
    }
  }

  // --- NUEVO: Notificar expiración de productos ---
  @Cron('*/10 * * * * *')
async notifyExpiredProducts() {
  this.logger.log('Checking for expired products...');
  try {
    const products = await this.productService.getProducts();
    const now = new Date();
    const expiredProducts = products.filter(product => {
      if (!product.expiryDate) return false;
      const expiry = new Date(product.expiryDate);
      return expiry <= now;
    });
    this.logger.log(`Expired products: ${JSON.stringify(expiredProducts)}`);
    expiredProducts.forEach(product => {
      this.notificationsService.addNotification({
        patientName: product.name,
        date: String(product.expiryDate),
        seen: false,
        type: 'expired',       // Ahora 'expired' es un valor válido
        productId: product.id  // Se agrega el ID del producto
      });
    });
    
  } catch (error) {
    this.logger.error('Error checking expired products:', error.message, error.stack);
  }
}



  private notifyFrontend(appointment: any, type: 'upcoming' | 'completed') {
    if (!appointment?.patientName || !appointment?.appointmentDate) {
      this.logger.warn(`Skipping notification for appointment with missing data: ${JSON.stringify(appointment)}`);
      return;
    }

    this.logger.log(`Notifying frontend about appointment: ${JSON.stringify(appointment)}`);

    this.notificationsService.addNotification({
      patientName: appointment.patientName,
      date: appointment.appointmentDate,
      seen: false,
      type,
    });
  }
}
