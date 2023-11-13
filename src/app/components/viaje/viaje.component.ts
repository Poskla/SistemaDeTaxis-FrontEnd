import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Viaje } from 'src/app/models/viaje'
import { Auto } from 'src/app/models/auto'
import { ViajeService } from 'src/app/services/viaje.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AutoService } from 'src/app/services/auto.service'

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
  viajeList = new Array<Viaje>()
  autoList = new Array<Auto>()
  viaje = new Viaje()
  viajeForm: FormGroup
  id2: number
  origen2: string
  destino2: string
  costo2: number
  autoId: number
  
  constructor(private viajeService: ViajeService, private autoService: AutoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.viajeForm = new FormGroup({
      'origen': new FormControl(this.viaje.origen, Validators.required),
      'destino': new FormControl(this.viaje.destino, Validators.required),
      'costo': new FormControl(this.viaje.destino, Validators.required),
      'auto': new FormControl(this.autoId, Validators.required)
    })
    this.getAllViajes()
  }

  get origen() { return this.viajeForm.get('origen') }
  get destino() { return this.viajeForm.get('destino') }
  get costo() { return this.viajeForm.get('costo') }
  get auto() { return this.viajeForm.get('auto') }

  getAllAutos(){
    this.autoService.getAll().subscribe(response => {
      this.autoList = response
    }, error => {
      console.log(error)
    })
  }

  getAllViajes() {
    this.viajeService.getAll().subscribe(response => {
      this.viajeList = response
      document.getElementsByTagName('input')[0].focus()
      this.getAllAutos()
    }, error => {
      console.log(error)
    })
  }

  save() {
    if (this.viajeForm.invalid) 
    {
    alert("Faltan campos por completar.");
    }
    else
    {
      this.viaje.origen = this.origen?.value
      this.viaje.destino = this.destino?.value
      this.viaje.costo = this.costo?.value
      this.viajeService.save(this.viaje).subscribe(response => {
        this.autoService.setViaje(this.auto?.value, response).subscribe(() => {
          location.reload()
        }, error => {
          console.log(error)
        })
      }, error => {
        console.log(error)
      })
    }
  }

  view(viaje: Viaje, ver: any) {
    this.id2 = viaje.id
    this.origen2 = viaje.origen
    this.destino2 = viaje.destino
    this.costo2 = viaje.costo
    this.modalService.open(ver).result.then(() => {
      viaje.origen = this.origen2
      viaje.destino = this.destino2
      viaje.costo = this.costo2
      this.viajeService.update(viaje).subscribe(() => {
        location.reload()
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })
  }

  delete(id: number) {
    this.viajeService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.log(error)
    })
  }
}