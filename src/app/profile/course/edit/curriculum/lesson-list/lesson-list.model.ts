import {Serializable} from "../../../../../shared/Serializeble.interface";
import {Field_error} from "../../../../../shared/Field_error.model";
import {Course} from "../../../../../shared/Course.model";

export class Order implements Serializable<Order> {
    public lesson_id: number = null;
    public new_order: number = null;

    deserialize(input: any) {
        if (input) {
            this.lesson_id = input.lesson_id;
            this.new_order = input.new_order;
        }
        return this;
    }
}

export class Update_lessons_order_request implements Serializable<Update_lessons_order_request> {
    public order: Array<Order> = [];

    deserialize(input: any) {
        if (input) {
            if (input.order.length) {
                let order: Order;
                for (let i in input.order) {
                    order = new Order().deserialize(input.order[i]);
                    this.order.push(order);
                }
            }
        }
        return this;
    }
}

export class Update_lessons_order_errors implements Serializable<Update_lessons_order_errors> {
    public order: Field_error = new Field_error();

    deserialize(input: any) {
        if (input) {
            this.order = new Field_error().deserialize(input.order);
        }
        return this;
    }
}

export class Update_lessons_order_response implements Serializable<Update_lessons_order_response> {
    public success: boolean = false;
    public data: Course = new Course();
    public errors: Update_lessons_order_errors = new Update_lessons_order_errors();

    deserialize(input: any) {
        if (input) {
            this.success = input.success;
            this.data = new Course().deserialize(input.data);
            this.errors = new Update_lessons_order_errors().deserialize(input.errors);
        }
        return this;
    }
}