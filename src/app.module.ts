import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './patient/patient.entity';
import { Appointment } from './appointment/appointment.entity';
import { DentalRecord } from './dental-record/dental-record.entity';
import { Service } from './service/service.entity';
import { CustomerInvoice } from './customer-invoice/customer-invoice.entity';
import { patientsModule } from './patient/patient.module';
import { PatientAppointmentsModule } from './appointment/appointment.module';
import { DentalRecordModule } from './dental-record/dental-record.module';
import { CustomerInvoiceModule } from './customer-invoice/customer-invoice.module';
import { ServiceModule } from './service/service.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { CategoryProductModule } from './category-product/category-product.module';
import { CategoryProduct } from './category-product/category-product.entity';
import { Product } from './product/product.entity';
import { Supplier } from './supplier/supplier.entity';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/employee.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ReminderModule } from './reminder/reminder.module';
import { NotificationModule } from './notification/notification.module';
import { ToothController } from './tooth/tooth.controller';
import { ToothModule } from './tooth/tooth.module';
import { TeethController } from './teeth/teeth.controller';
import { TeethService } from './teeth/teeth.service';
import { TeethModule } from './teeth/teeth.module';
import { AppointmentService } from './appointment/appointmentServices.entity';
import { DuesModule } from './dues/dues.module';
import { Dues } from './dues/dues.entity';
import { ProcedureController } from './procedure/procedure.controller';
import { ProcedureService } from './procedure/procedure.service';
import { ProcedureModule } from './procedure/procedure.module';
import { OdontogramController } from './odontogram/odontogram.controller';
import { OdontogramModule } from './odontogram/odontogram.module';
import { Odontogram } from './odontogram/odontogram.entity';
import { Tooth } from './tooth/tooth.entity';
import { Procedure } from './procedure/procedure.entity';
import { AppointmentTooth } from './appointment/appointment-tooth.entity';
import { AppointmentCronService } from './cron-jobs/appointment.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { AntecedentsModule } from './antecedents/antecedents.module';
import { Antecedent } from './antecedents/antecedents.entity';
import { AntecedentAttachment } from './antecedents-attachment/antecedentAttachment.entity';
import { AntecedentAttachmentsModule } from './antecedents-attachment/antecedents-attachment.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'testDatabase',
      database: 'odontdb',
      models: [User, Patient, Appointment, AppointmentService, Dues ,DentalRecord, Service, CustomerInvoice, CategoryProduct, Supplier, Product, Employee, Odontogram, Tooth, Procedure, AppointmentTooth, Antecedent, AntecedentAttachment],
      logging: console.log,
      
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    patientsModule,
    PatientAppointmentsModule,
    DentalRecordModule,
    ServiceModule,
    CustomerInvoiceModule,
    CategoryProductModule,
    SupplierModule,
    ProductModule,
    EmployeesModule,
    NotificationModule,
    ReminderModule,
    TeethModule,
    DuesModule,
    OdontogramModule, 
    ProcedureModule,
    ToothModule,
    NotificationModule,
    AntecedentsModule,
    AntecedentAttachmentsModule
    
  ],
  controllers: [ToothController, TeethController, ProcedureController, OdontogramController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TeethService,
    ProcedureService,
    AppointmentCronService,
 
  ],
  exports: [patientsModule], 
})
export class AppModule {}



// docker run --name odontdb -e MYSQL_ROOT_PASSWORD=testDatabase -e MYSQL_DATABASE=odontdb -p 3306:3306 -d mysql:latest
// docker run --name odontdb -e POSTGRES_USER=root -e POSTGRES_PASSWORD=testDatabase -e POSTGRES_DB=odontdb -p 5432:5432 -d postgres:latest
// docker exec -it odontdb psql -U root -d odontdb

