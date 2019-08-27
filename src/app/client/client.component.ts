import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Client } from '../models/client';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    cpf: ['', [Validators.required, Validators.min(0)]],
    phone: ['', [Validators.required, Validators.min(0)]],
    address:['', [Validators.required]]
  });

  @ViewChild('form') form: NgForm;

  clients: Client[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.clientService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cl) => this.clients = cl);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  save(){
    let data = this.clientForm.value
    if (data._id != null) {
      this.clientService.update(data)
        .subscribe(
          (c)=> this.notify("Cliente atualizado com sucesso!")
        );
    }
    else {
      this.clientService.add(data)
        .subscribe(
          (c) => this.notify("Cliente inserido com sucesso!")
        );
    }
    this.resetForm();
  }

  delete(c: Client) {
    this.clientService.del(c)
      .subscribe(
        () => this.notify("Cliente deletado com sucesso!"),
        (err) => console.log(err)
      )
  }

  edit(c: Client) {
    this.clientForm.setValue(c);
  }

  notify(msg: string) {
    this.snackbar.open(msg, "OK", {duration: 3000});
  }

  resetForm() {

    this.form.resetForm();
  }
}
