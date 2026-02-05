import{a as F,b as M}from"./chunk-RH27SGAF.js";import{b as l,c,d,e as f,f as g,g as h,h as C,i as b,j as I}from"./chunk-7MIEAEIX.js";import{h as N,k as E,m as y,n as v}from"./chunk-UKIC3YHV.js";import{a as j}from"./chunk-XDYZBVJZ.js";import"./chunk-SRVTQ7BG.js";import{Ba as s,Ha as u,Ra as o,Ya as a,Za as n,_a as t,xa as r}from"./chunk-QOCO4Q7N.js";import"./chunk-C6Q5SG76.js";var S=class p{constructor(m){this.fb=m;this.form=this.fb.group({nombre:["",l.required],email:["javier2315@gmail.com",[l.required,l.email]],busqueda:[""],precio:[""]})}form;MailIcon=N;SearchIcon=E;htmlEjemplo1=`<app-input
  label="Nombre Completo"
  placeholder="Ej. Juan P\xE9rez"
  formControlName="nombre"
/>`;tsEjemplo1=`
  form: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }  
  `;htmlEjemplo2=`
    <app-input label="Correo Electr\xF3nico" type="email" formControlName="email">
      <lucide-icon
        #leftIcon
        leftIcon
        [img]="MailIcon"
        [size]="20"
        class="text-gray-400"
      />
    </app-input>
  </app-component-showcase>  
  `;tsEjemplo2=`
  import { LucideAngularModule, Mail } from 'lucide-angular';

  imports: [
    LucideAngularModule,
    ...

  form: FormGroup;
  readonly MailIcon = Mail;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      email: ['javier2315@gmail.com', [Validators.required, Validators.email]],
    });
  }    
  `;htmlEjemplo3=`
    <app-input
      label="B\xFAsqueda Avanzada"
      size="lg"
      placeholder="Buscar productos..."
      formControlName="busqueda"
    >
      <lucide-icon
        #rightIcon
        rightIcon
        [img]="SearchIcon"
        [size]="20"
        class="text-gray-400"
      />
    </app-input>  
  `;tsEjemplo3=`
  import { LucideAngularModule, Search } from 'lucide-angular';

  imports: [
    LucideAngularModule,
    ...

  form: FormGroup;
  readonly SearchIcon = Search;

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      busqueda: [''],
    });
  }  
  `;static \u0275fac=function(i){return new(i||p)(s(C))};static \u0275cmp=u({type:p,selectors:[["app-input-docs-page"]],decls:13,vars:11,consts:[["leftIcon",""],["rightIcon",""],[1,"space-y-6",3,"formGroup"],["title","Input Gu\xEDa","subTitle","Componente de entrada de texto con soporte para iconos y validaciones."],["title","Uso B\xE1sico","description","Input de texto est\xE1ndar con etiqueta y placeholder.",3,"htmlCode","tsCode"],["label","Nombre Completo","placeholder","Ej. Juan P\xE9rez","formControlName","nombre"],["title","Iconos e Identidad","description","Uso de Content Projection para a\xF1adir iconos decorativos.",3,"htmlCode","tsCode"],["label","Correo Electr\xF3nico","type","email","formControlName","email"],["leftIcon","",1,"text-gray-400",3,"img","size"],["title","Variaciones de Tama\xF1o (Large)","description","Ajuste de dimensiones para buscadores o \xE1reas destacadas.",3,"htmlCode","tsCode"],["label","B\xFAsqueda Avanzada","size","lg","placeholder","Buscar productos...","formControlName","busqueda"],["rightIcon","",1,"text-gray-400",3,"img","size"]],template:function(i,e){i&1&&(a(0,"form",2),t(1,"app-header-page",3),a(2,"app-component-showcase",4),t(3,"app-input",5),n(),a(4,"app-component-showcase",6)(5,"app-input",7),t(6,"lucide-icon",8,0),n()(),a(8,"app-component-showcase",9)(9,"app-input",10),t(10,"lucide-icon",11,1),n()()(),t(12,"app-api-info")),i&2&&(o("formGroup",e.form),r(2),o("htmlCode",e.htmlEjemplo1)("tsCode",e.tsEjemplo1),r(2),o("htmlCode",e.htmlEjemplo2)("tsCode",e.tsEjemplo2),r(2),o("img",e.MailIcon)("size",20),r(2),o("htmlCode",e.htmlEjemplo3)("tsCode",e.tsEjemplo3),r(2),o("img",e.SearchIcon)("size",20))},dependencies:[v,y,j,F,I,b,f,c,d,g,h,M],encapsulation:2})};export{S as InputDocsPageComponent};
