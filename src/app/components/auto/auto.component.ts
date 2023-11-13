import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Auto } from 'src/app/models/auto'
import { Chofer } from 'src/app/models/chofer'
import { AutoService } from 'src/app/services/auto.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ChoferService } from 'src/app/services/chofer.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  autoList = new Array<Auto>()
  choferList = new Array<Chofer>()
  auto = new Auto()
  autoForm: FormGroup
  id2: number
  matricula2: string
  modelo2: string
  chofer2: Chofer
  choferId: number

  constructor(private autoService: AutoService, private choferService: ChoferService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.autoForm = new FormGroup({
      'matricula': new FormControl(this.auto.matricula, Validators.required),
      'modelo': new FormControl(this.auto.modelo),
      'chofer': new FormControl(this.choferId, Validators.required)
    })
    this.getAllAutos()
  }

  get matricula() { return this.autoForm.get('matricula') }
  get modelo() { return this.autoForm.get('modelo') }
  get chofer() { return this.autoForm.get('chofer') }

  getAllChoferes(){
    this.choferService.getAll().subscribe(response => {
      this.choferList = response
    }, error => {
      console.log(error)
    })
  }

  getAllAutos() {
    this.autoService.getAll().subscribe(response => {
      this.autoList = response
      document.getElementsByTagName('input')[0].focus()
      this.getAllChoferes()
    }, error => {
      console.log(error)
    })
  }

  save() {
    if (this.autoForm.invalid) 
    {
    alert("Faltan campos por completar.");
    }
    else
    {
      this.auto.matricula = this.matricula?.value
      this.auto.modelo = this.modelo?.value
      this.autoService.save(this.auto).subscribe(response => {
        this.choferService.setAuto(this.chofer?.value, response).subscribe(() => {
          location.reload()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }
  }

  view(auto: Auto, ver: any) {
    this.id2 = auto.id
    this.matricula2 = auto.matricula
    this.modelo2 = auto.modelo
    this.chofer2 = auto.chofer
    this.modalService.open(ver).result.then(() => {
      auto.modelo = this.modelo2
      auto.matricula = this.matricula2
      auto.chofer = this.chofer2
      this.autoService.update(auto).subscribe(() => {
        location.reload()
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

  delete(id: number) {
    this.autoService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.log(error)
    })
  }

}