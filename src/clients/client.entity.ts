import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DentalRecord } from 'src/dental-record/dental-record.entity';
import { Appointment } from 'src/patient-appointments/appointment.entity';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    tel: string;

    @Column({ nullable: true })
    email: string;

    @OneToMany(() => DentalRecord, dentalRecord => dentalRecord.client)
    dentalRecord: DentalRecord[];

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointment: Appointment[];
}



