import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-example.html',
  styleUrls: ['chips-input-example.css'],
})
export class ChipsInputExample {
  constructor(private form: FormBuilder) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  fruits: Fruit[] = [ ];
  
  displayedColumns = ['name'];

  sampleControl = new FormControl('');

  randomSample = new MatTableDataSource();

  fruitForm = this.form.group({
    fruitName: ['', Validators.required],
  });


  ngOnInit(): void {
    this.randomSample.data = [];
    var aux:any = localStorage.getItem("storedFruits");
    let storeAux = JSON.parse(aux);
    storeAux.forEach((element: any) => {
      this.fruits= [...this.fruits,element];  
    })
  }

  
  sampleOrder(){
    this.randomSample.data = [];  
    let n:number= this.fruits.length;
    let fruitsCopy= [...this.fruits];   
    for(let i = 0; i<n; i++){ 
      let nSorteado = Math.floor(Math.random() *  fruitsCopy.length);  
      this.randomSample.data = [...this.randomSample.data,fruitsCopy[nSorteado]]    
      fruitsCopy.splice(nSorteado,1)
      }  
  }

  saveLocally(){
    localStorage.setItem("storedFruits", JSON.stringify(this.fruits)); 
  }

  
  sampleFruit() {
    let sorteado = this.fruits[Math.floor(Math.random() *  this.fruits.length)];
    this.sampleControl.setValue(sorteado.name) 
  }


  addNewFruit() {
    this.fruits.push({ name: this.fruitForm.value.fruitName });
    this.fruitForm.setValue({
      fruitName: '',
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
