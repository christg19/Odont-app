import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/client.entity';

@Entity()
export class DentalRecord {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text', { nullable: true })
    historialMedico: string;

    @Column('text', { nullable: true })
    procedimientosRealizados: string;

    @ManyToOne(() => Client, client => client.dentalRecord)
    paciente: Client;
}
