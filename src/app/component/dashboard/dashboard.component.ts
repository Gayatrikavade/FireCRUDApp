import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Students } from 'src/app/model/students';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  studentDetail !:FormGroup;
  StudentList:Students[]=[];

  
  id:string='';
  firstName:string='';
  lastName:string='';
  email:string='';
  mobile:string='';
 
  
  studentObj:Students={
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    mobile:''
  };


  constructor(private dataService:DataService,private formBuilder:FormBuilder){
 
  }

  ngOnInit():void{
    this.getAllStudents();
    
    this.studentDetail = this.formBuilder.group({
      id :[''],
      firstName :[''],
      lastName :[''],
      email: [''],
      mobile:['']
    });  
     
  }
  

  resetForm(){
    this.id='';
    this.firstName='';
    this.lastName='';
    this.mobile='';
    this.mobile=''
  }

  getAllStudents(){
    this.dataService.getAllStudents().subscribe(
    res=>{
      this.StudentList=res.map((e:any)=>{
        const data=e.payload.doc.data();
        data.id=e.payload.doc.id;
        return data;
      })
    },
    err=>{
      alert("Error whle fecting");
    })
  }

  addStudent(){

    if(this.studentDetail.invalid) {
      alert('Please enter all details!!');
      return;
    }
    this.studentObj = this.studentDetail.value;
    this.dataService.addStudent(this.studentObj);
    this.resetForm();

  }
  deleteStudent(student:Students){
    if(window.confirm('Are you sure you want to delete the '+student.firstName+" "+student.lastName+" ?")){
      this.dataService.deleteStudent(student);
    }
  }

  updateStudent(student:Students){
  //  return this.dataService.updateStudent(student);
  
  this.studentObj.id=this.studentDetail.value.id;
  this.studentObj.firstName=this.studentDetail.value.firstName;
  this.studentObj.lastName=this.studentDetail.value.lastName;
  this.studentObj.email=this.studentDetail.value.email;
  this.studentObj.mobile=this.studentDetail.value.mobile;

  this.dataService.updateStudent(this.studentObj);

  }
  

  editStudent(student:Students){
    this.studentDetail.controls['id'].setValue(student.id);
    this.studentDetail.controls['firstName'].setValue(student.firstName);
    this.studentDetail.controls['lastName'].setValue(student.lastName);
    this.studentDetail.controls['email'].setValue(student.email);
    this.studentDetail.controls['mobile'].setValue(student.mobile);
  }

}
