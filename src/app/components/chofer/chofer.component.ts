import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auto } from 'src/app/models/auto'
import { Chofer } from 'src/app/models/chofer'
import { AutoService } from 'src/app/services/auto.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ChoferService } from 'src/app/services/chofer.service'

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css']
})
export class ChoferComponent implements OnInit {

  choferList = new Array<Chofer>()
  autoList = new Array<Auto>()
  chofer = new Chofer()
  choferForm: FormGroup
  id2: number
  dni2: string
  nombre2: string

  constructor(private choferService: ChoferService, private autoService: AutoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.choferForm = new FormGroup({
      'dni': new FormControl(this.chofer.dni, Validators.required),
      'nombre': new FormControl(this.chofer.nombre, Validators.required)
    })
    this.getAll()
  }

  get dni() { return this.choferForm.get('dni') }
  get nombre() { return this.choferForm.get('nombre') }

  getAll() {
    this.choferService.getAll().subscribe(response => {
      this.choferList = response
      document.getElementsByTagName('input')[0].focus()
    }, error => {
      console.log(error)
    })
  }

  save() {
    if (this.choferForm.invalid) 
    {
    alert("Faltan campos por completar.");
    }
    else
    {
      this.chofer.dni = this.dni?.value
      this.chofer.nombre = this.nombre?.value
      this.choferService.save(this.chofer).subscribe(response => {
          location.reload()
        }, error => {
          console.log(error)
        })
    }
  }

  view(chofer: Chofer, ver: any) {
    this.id2 = chofer.id
    this.dni2 = chofer.dni
    this.nombre2 = chofer.nombre
    this.modalService.open(ver).result.then(() => {
      chofer.dni = this.dni2
      chofer.nombre = this.nombre2
      this.choferService.update(chofer).subscribe(() => {
        location.reload()
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

  delete(id: number) {
    this.choferService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.log(error)
    })
  }

}