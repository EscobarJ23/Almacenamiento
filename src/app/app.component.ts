import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  datos = new FormGroup({
    Id: new FormControl(''),
    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    Edad: new FormControl('')
  })
  title = 'Almacenamiento';
  tabla = [];
  bandera = false;
  async setObject() {
    const { Id, Nombre, Apellido, Edad } = this.datos.value
    await Storage.set({
      key: Id,
      value: JSON.stringify({
        nombre: Nombre,
        apellido: Apellido,
        edad: Edad
      })
    });
    this.getObject();
  }
  async getObject() {
    this.bandera=true;
    this.tabla=[];
    const { keys } = await Storage.keys();
    keys.forEach(async (element)=>{
      const ret = await Storage.get({ key:element});
      this.tabla.push([element,JSON.parse(ret.value)]);
    });
  }

  async clean(){
    await Storage.clear();
  }

}
