import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Product } from 'model/product/Product';

import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, MotherboardMaker } from './MotherboardEnums';
import { CPUSocket, VideoCabel } from '../CPU/CPUEnums';

@ApiTags('Motherboard')
@Entity()
export class Motherboard extends BaseAccessory {
    constructor(maker: string, model: string, socket: CPUSocket) {
        super();
        this.name = `${maker} ${model} ${socket}`;
    }

    @ApiProperty()
    @Column({ type: 'enum', enum: MotherboardMaker })
    public maker: MotherboardMaker;

    @ApiProperty()
    @Column({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket;

    @ApiProperty()
    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public microarchitecture: string;

    @ApiProperty()
    @Column({
        name: 'chipset',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public chipset: string;

    @ApiProperty({
        maximum: 255,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'technologies',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public technologies: string;

    @ApiProperty()
    @Column({
        name: 'form_factor',
        enum: FormFactor,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public formFactor: FormFactor;

    @ApiProperty()
    @Column({
        name: 'supported_memory_frequencies',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public supportedMemoryFrequencies: number[];

    @ApiProperty()
    @Column({
        name: 'memory_slots_count',
        type: 'smallint',
        nullable: true
    })
    public memorySlotsCount: number;

    @ApiProperty({
        maximum: 256,
        minimum: 1
    })
    @Column({
        name: 'max_ram_gb',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public maxRamGb: number;

    @ApiProperty({
        maximum: 8,
        minimum: 1
    })
    @Column({
        name: 'max_sata_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public maxSataCount: number;

    @ApiProperty({
        maximum: 5,
        minimum: 0
    })
    @Column({
        name: 'connectors_for_ssd',
        type: 'smallint',
        nullable: false
    })
    @Max(5)
    @Min(0)
    @IsNotEmpty()
    public connectorsForSSD: number;

    @ApiProperty({
        maximum: 255,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'interface_m2_slot',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public interfaceM2Slot: string;

    @ApiProperty({
        maximum: 4,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'pci_express_x16_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pciExpressx16Count: number;

    @ApiProperty({
        maximum: 4,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'pci_express_x1_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pciExpressx1Count: number;

    @ApiProperty({
        maximum: 6,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'pci_express_standard',
        type: 'smallint',
        nullable: true
    })
    @Max(6)
    @Min(1)
    public pciExpressStandard: number;

    @ApiProperty({
        maximum: 255,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'pci_express_workflow',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public pciExpressWorkflow: string;

    @ApiProperty({
        maximum: 35,
        minimum: 1
    })
    @Column({
        name: 'audiocodec',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(1)
    @IsNotEmpty()
    public audiocodec: string;

    @ApiProperty({
        maximum: 8,
        minimum: 1
    })
    @Column({
        name: 'channel_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public channelCount: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'video_cabel_type',
        enum: VideoCabel,
        type: 'enum',
        array: true,
        default: [],
        nullable: true
    })
    public videoCabelType: VideoCabel[];

    @ApiProperty({
        maximum: 550,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'internal_connectors',
        type: 'text',
        nullable: true
    })
    @MaxLength(550)
    @MinLength(1)
    public internalConnectors: string;

    @ApiProperty({
        maximum: 55,
        minimum: 1
    })
    @Column({
        name: 'power_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(55)
    @MinLength(1)
    @IsNotEmpty()
    public powerConnectors: string;

    @ApiProperty({
        maximum: 255,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'backpanel_connectors',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public backpanelConnectors: string;

    @ApiProperty({
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_30',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb30: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_31_gen1',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen1: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_31_gen2',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen2: number;

    @ApiProperty({
        maximum: 2,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_31_gen2_type_c',
        type: 'smallint',
        nullable: true
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen2TypeC: number;

    @ApiProperty({
        maximum: 2,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_31_gen2x2_type_c',
        type: 'smallint',
        nullable: true
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb32Gen2x2TypeC: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'usb_32_gen1',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb32Gen1: number;

    @ApiProperty({
        maximum: 255,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'included_buttons',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public includedButtons: string;

    @ApiProperty({
        maximum: 50,
        minimum: 1
    })
    @Column({
        name: 'network_controller',
        type: 'text',
        nullable: false
    })
    @MaxLength(50)
    @MinLength(1)
    public networkController: string;

    @ApiProperty({
        maximum: 100,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'network_communications',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public networkCommunications: string;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'bios',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public bios: string;

    @ApiProperty({
        isArray: true,
        maxLength: 4,
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'RAID_sata_array',
        type: 'double precision',
        array: true,
        default: [],
        nullable: true
    })
    @MaxLength(4)
    @MinLength(0)
    public RAIDSataArray: [];

    @ApiProperty({
        maxLength: 20,
        minLength: 1
    })
    @Column({
        name: 'size_w_h_mm',
        type: 'text',
        nullable: true
    })
    @MaxLength(20)
    @MinLength(0)
    sizeWHMm: string;

    @ApiProperty({
        maximum: 455,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @ApiProperty({
        maximum: 2000000,
        minimum: 6000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        nullable: false,
        default: 6000
    })
    @Max(2000000)
    @Min(6000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.motherboard, {
        nullable: true
    })
    public products: Product[];
}
