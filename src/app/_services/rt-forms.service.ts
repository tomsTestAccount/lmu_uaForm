import {Validators, FormGroup, FormControl, FormBuilder, FormArray, FormGroupName, AbstractControl} from '@angular/forms';
import {rtFormValidators}  from '../_services/rt-form-validators.service';
import { Injectable } from '@angular/core';

export class cFormObject {
    constructor(
        public formgroup : FormGroup,
        public formEntries:any[]
        //public isRequired:boolean
     ){}
}

@Injectable()
export class RtFormService {

    rtValidators = new rtFormValidators;

    constructor()
    {

    }


    buildFormObject(form:FormGroup,entries:any):cFormObject
    {

        return new cFormObject(form,entries);

    }

    toFormGroup(entries: any) {

        //console.log("entries=",entries);

        let group: any = {};

        //console.log("this.currentForm=", this.currentForm.entries);

        //'address2': ['', Validators.compose([Validators.required,Validators.minLength(3)])],

        entries.forEach(entry => {
            //console.log("entry=", entry.key);
            if (entry.key.type == 'fileUpload' || entry.key.type == 'grid-box-add')
            {
                group[entry.key] = new FormControl(entry.key.defaultValue || [], entry.key.validators);
            }
            else
            {
                group[entry.key] = new FormControl(entry.key.defaultValue || '', entry.key.validators);
            }

        })

        return new FormGroup(group);
        //return new FormArray(group);
    }

    /*
    addFormArray2Group(entries: any,required:boolean,parentForm:FormGroup) {


        let formControlGroup: any = {};
        //let formControlGroup: [FormControl] = [];

        //console.log("this.currentForm=", this.currentForm.entries);

        //'address2': ['', Validators.compose([Validators.required,Validators.minLength(3)])],



        let formArray:FormArray;
        if (required) formArray = new FormArray(formControlGroup,Validators.compose([Validators.required]));
        else formArray= new FormArray(formControlGroup);

        return parentForm;
    }
    */



    /*
    buildForm(entries:[any],required:boolean):FormGroup{


        //let formObj= new cFormObject(name,entries,required);

        let form:FormGroup;
        //form = this.toFormGroup(entries);


        //let formArray:FormArray;

        form = this.addFormArray2Group(entries,required,form);

        //formArray.setParent(form);

        //form. = 'dsjhdg';



        return form;

    }
    */


}
