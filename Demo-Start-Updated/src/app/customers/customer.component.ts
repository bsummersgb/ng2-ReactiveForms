import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup; // Declares the ROOT FormGroup which defines the FormModel
    customer: Customer= new Customer();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.customerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]], /* {value: '', disabled: true}, alternative object syntax*/ 
            email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+")]],
            phone: [''],
            notification: 'email',
            sendCatalog: true
        });
    }

    populateTestData() {
        this.customerForm.patchValue({
            firstName: 'Jack',
            lastName: 'Bauer',
            email: 'jbauer@yopmail.com',
            sendCatalog: false
        });
    }

    setNotification(notifyVia: string): void {
        const phoneControl = this.customerForm.get('phone')
        if (notifyVia === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity(); // after setting or clearing validators, we need to reevaluate the phoneControls validation state.
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
