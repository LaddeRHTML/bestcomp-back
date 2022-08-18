import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCharacteristic } from 'src/interfaces/product.interface';

export type AccessoriesDocument = Accessory & Document;

@Schema({ versionKey: false })
export class Accessory {
    @Prop({ required: true, default: 'accessory' })
    type: string;

    @Prop({ required: true, default: '' })
    name: string;

    @Prop({ required: true, default: 0 })
    marketprice: number;

    @Prop({ required: true, default: 0 })
    supplierPrice: number;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: false, default: 0 })
    discountPrice: number;

    @Prop({ required: false, default: '' })
    description: string;

    @Prop({ required: false })
    pictures: [string];

    @Prop({ required: true })
    previewPicture: string;

    @Prop({ required: false, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, default: 0 })
    count: number;

    @Prop({ default: [] })
    characteristics: [ProductCharacteristic];

    // CPU/GPU/other
    @Prop({ required: true, default: '' })
    class: string;

    @Prop({ required: false, default: '' })
    vendorСode: string;

    @Prop({ required: true, default: '' })
    maker: string;

    @Prop({ required: true, default: '' })
    weight: string;

    @Prop({ required: true, default: '' })
    model: string;

    @Prop({ required: true })
    warrantyDays: number;

    @Prop({ required: false, default: new Date() })
    uploadDate: Date;

    @Prop({ required: false, default: new Date() })
    updateDate: Date;
}

export const AccessorySchema = SchemaFactory.createForClass(Accessory);