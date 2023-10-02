import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/client.entity';

@Entity()
export class DentalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    medicalHistory: string[];

    @Column('text', { nullable: true })
    proceduresPerformed: string;

    @ManyToOne(() => Client, client => client.dentalRecord)
    client: Client;

    @Column('text', { nullable: true })
    clientName: string;
}
