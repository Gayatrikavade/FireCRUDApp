import { Injectable } from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore'
import { Students } from '../model/students';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }

  addStudent(student:Students){
    student.id=this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  getAllStudents(){
    return this.afs.collection('/Students').snapshotChanges();
  }

  deleteStudent(student:Students){
    return this.afs.doc('/Students/'+student.id).delete();
  }

  updateStudent(student:Students){
    // this.deleteStudent(student);
    // this.addStudent(student);
    // return this.afs.doc('/Students/'+student.id).update(student);
    return this.afs.doc('/Students/' + student.id).update(student);
  }


}
