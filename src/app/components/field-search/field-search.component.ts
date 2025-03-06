import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DDLPokemonType } from 'src/app/interfaces/DDLPokemonType';

@Component({
  selector: 'app-field-search',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './field-search.component.html',
  styleUrl: './field-search.component.scss'
})
export class FieldSearchComponent implements OnInit, OnChanges {
  @Input() DDLData: DDLPokemonType[] = [];
  @Output() onFilterEvent = new EventEmitter();

  filterForm: FormGroup = new FormGroup({});
  ddlPokemonType: DDLPokemonType[] = [];

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['DDLData'] && changes['DDLData']?.currentValue){
      const PokemonType = changes['DDLData'].currentValue;
      if(PokemonType.length != 0){
        this.ddlPokemonType = PokemonType;
      }
    }
  }

  initForm() {
    this.filterForm = new FormGroup({
      pokemonType: new FormControl('', Validators.required),
    });
  }

  onFilter(){
    if(this.filterForm.invalid){
      this.filterForm.markAsTouched();
      this.filterForm.updateValueAndValidity();
    } else {
      const payload = this.filterForm.getRawValue();
      this.onFilterEvent.emit(payload)
    }
  }

}
