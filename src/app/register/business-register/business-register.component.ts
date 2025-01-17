import { Component, OnInit ,ElementRef, NgZone} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Business,BusinessType,BusinessPasswordChange,SubBusinessType } from '../../business';
import { HttpClientService } from '../../service/http-client.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-register',
  templateUrl: './business-register.component.html',
  styleUrls: ['./business-register.component.css']
})
export class BusinessRegisterComponent implements OnInit {
  htmlToAddPhoneNumber='';
  businesstypes=BusinessType;
  subbusinesstypes=SubBusinessType;
  phoneNumberCounter=1;
  addressCounter=1;
  replicateAddressCheckbox=true;
  phonenumber1=false;
  phonenumber2=false;
  officeAddress1=false;
  sameAddress=false;
  submitted = false;
  addresstypevalue = 'HOME';
  phonetypevalue = 'HOME';

  b_type_keys() : Array<string> {
    var keys = Object.keys(this.businesstypes);
    return keys;
  }
  b_type_values(): Array<string> {
    var values = Object.values(this.businesstypes);
    return values;
  }
  sub_b_type_keys() : Array<string> {
    var keys = Object.keys(this.subbusinesstypes);
    return keys;
  }
  sub_b_type_values(): Array<string> {
    var values = Object.values(this.subbusinesstypes);
    return values;
  }

  constructor(
    public router: Router,
    public activatedroute: ActivatedRoute,
    public elementRef:ElementRef,
    public httpClientService: HttpClientService,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
  }

  addAnotherPhoneNumber(){
    if(this.phoneNumberCounter==1 || this.phoneNumberCounter==3){
      this.phoneNumberCounter+=1;
      this.phonenumber1=true;
    }
    else if(this.phoneNumberCounter==2){
      this.phoneNumberCounter+=2;
      this.phonenumber2=true;
    }
  }
  removePhoneNumber1(){
    this.phoneNumberCounter-=1;
    this.phonenumber1=false;
  }
  removePhoneNumber2(){
    this.phoneNumberCounter-=2;
    this.phonenumber2=false;
  }

  addAnotherAddress(){
    if(this.addressCounter==1){
      this.addressCounter+=1;
      this.replicateAddressCheckbox=false;  
      this.officeAddress1=true;
      document.getElementById('another_address').setAttribute('hidden','hidden');
      document.getElementById('city_field1').classList.remove('col-sm-5');
      document.getElementById('city_field1').classList.add('col-sm-6');
    }
  }
  removeAddress(){
    this.replicateAddressCheckbox=true;
    this.addressCounter -= 1;
    this.officeAddress1 = false;
    document.getElementById('another_address').removeAttribute('hidden',);
    document.getElementById('city_field1').classList.add('col-sm-5');
    document.getElementById('city_field1').classList.remove('col-sm-6');
  }
  onChangeCheckbox(event,addressline1:string,addressline2:string,landmark:string,pincode:number,country:string,state:string,city:string){
    if(event.target.checked){
      this.sameAddress=true;
      this.model.secondaryAddressLine1=addressline1;
      this.model.secondaryAddressLine2=addressline2;
      this.model.secondaryLandmark=landmark;
      this.model.secondaryCountry=country;
      this.model.secondaryState=state;
      this.model.secondaryCity=city;
      this.model.secondaryZipCode=pincode;
      document.getElementById('city_field1').classList.remove('col-sm-5');
      document.getElementById('city_field1').classList.add('col-sm-6');
      if(this.model.primaryAddressType=="HOME") this.model.secondaryAddressType="OFFICE";
      if(this.model.primaryAddressType=="OFFICE") this.model.secondaryAddressType="HOME";
    }
    else{
      this.sameAddress=false;
      this.model.secondaryAddressLine1=null;
      this.model.secondaryAddressLine2=null;
      this.model.secondaryLandmark=null;
      this.model.secondaryCountry=null;
      this.model.secondaryState=null;
      this.model.secondaryCity=null;
      this.model.secondaryZipCode=null;
      document.getElementById('city_field1').classList.add('col-sm-5');
      document.getElementById('city_field1').classList.remove('col-sm-6');
      
    }
  }
  onAddressTypeChange(event){
    this.model.primaryAddressType=event.target.value;
    let address_matches1 = document.getElementsByClassName('address-1');
      for (let i=0; i<address_matches1.length; i++) {
        address_matches1[i].removeAttribute('readonly');
      }
    if(this.model.primaryAddressType=='HOME'){
      this.model.secondaryAddressType='OFFICE';
      let address_matches2 = document.getElementsByClassName('address-2');
      for (let i=0; i<address_matches2.length; i++) {
        address_matches2[i].removeAttribute('readonly');
      }
      this.addresstypevalue = 'HOME';
    }
    else if(this.model.primaryAddressType=='OFFICE'){
      this.model.secondaryAddressType='HOME';
      let address_matches2 = document.getElementsByClassName('address-2');
      for (let i=0; i<address_matches2.length; i++) {
        address_matches2[i].removeAttribute('readonly');
      }
      this.addresstypevalue = 'OFFICE';
    }
  }
  onAddressTypeChange1(event){
    this.model.secondaryAddressType=event.target.value;
    let address_matches2 = document.getElementsByClassName('address-2');
      for (let i=0; i<address_matches2.length; i++) {
        address_matches2[i].removeAttribute('readonly');
      }
      if(this.model.secondaryAddressType=='HOME'){
        this.model.primaryAddressType='OFFICE';
        let address_matches2 = document.getElementsByClassName('address-2');
        for (let i=0; i<address_matches2.length; i++) {
          address_matches2[i].removeAttribute('readonly');
        }
      }
      else if(this.model.secondaryAddressType=='OFFICE'){
        this.model.primaryAddressType='HOME';
        let address_matches2 = document.getElementsByClassName('address-2');
        for (let i=0; i<address_matches2.length; i++) {
          address_matches2[i].removeAttribute('readonly');
        }
      }
  }
    
  model = new Business(null,null,null,null,null,null,null,null,null,"OFFICE",null,null,null,null,null,null,"HOME",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
  onSubmit() { this.submitted = true; }
  
  // TODO: Remove after api integration
  business_name = "Ferns n Petals"
  business_type = "Wedding Event Florists"
  business_url = "www.fernsnpetals.com"
  business_address = {
    OFFICE:{
    business_addressline1 : "3/12, Akshok Avenue",
    business_addressline2 : "Marks Road",
    business_landmark : "Near ABC Palace",
    business_country : "India",
    business_state : "Hyderabad",
    business_city : "Telangana",
    business_pincode : "111111"
  },
  HOME:{
    business_addressline1 : "3/12, GKS Avenue",
    business_addressline2 : "Markx Road",
    business_landmark : "Near XYZ Palace",
    business_country : "India",
    business_state : "Hyderabad",
    business_city : "Telangana",
    business_pincode : "111112"
  }
};
  business_description = "";
  business_phone_number = {HOME:9090909090,OFFICE:8080808080,MOBILE:''}
  services_provided = "Flower Decoration, Flower Gifts, Flower Vases, Flower Supplies, Bouquets";

  onPhoneTypeChange(event){
    if(event.target.value=='HOME'){
      this.phonetypevalue = 'HOME';
    }
    else if(event.target.value=='OFFICE'){
      this.phonetypevalue = 'OFFICE';
    }
    else if(event.target.value=='MOBILE'){
      this.phonetypevalue = 'MOBILE';
    }
  }

  model1 = new BusinessPasswordChange(null,null,null);
  passwordsubmitted = false;
  onChangePasswordForm() { this.passwordsubmitted = true; }

  editformsubmitted = false;
  onEditForm() { this.editformsubmitted = true; }

  createBusiness(userdata){ 
    this.httpClientService.CreateBusiness(userdata).subscribe(res => {
      alert("Business created successfully.")
      this.ngZone.run(() => this.router.navigateByUrl('/business'))
    });
  }
}