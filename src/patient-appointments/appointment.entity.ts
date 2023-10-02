import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/client.entity';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateHour: Date;

    @Column('text', { nullable: true })
    notes: string;

    @Column()
    status: string;

    @ManyToOne(() => Client, client => client.appointment)
    client: Client;
}