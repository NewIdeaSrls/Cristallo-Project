##################### temporaly save
/*hideExpression: 'model.insuranceUseAgency == "false" || model.insuranceUseAgency == undefined || model.insuranceUseAgency == null',*/
                /*expressionProperties: {

                  // Populate the 'selectedAgency' options dynamically when 'selectedInsurance' changes
                  'props.options': (field, model) => {
                    let insurance = this.form.get('selectedInsurance')
                    let insuranceId = insurance?.value;
                    let xoptions:any

                    if(insuranceId) {
                    console.log(insuranceId);
                    field.form?.get('selectedAgency')?.patchValue(null);
                    field.form?.get('agencyDescription')?.patchValue(null);
                    field.form?.get('agencyAddress')?.patchValue(null);
                    field.form?.get('agencyPhone')?.patchValue(null);
                    field.form?.get('agencyEmail')?.patchValue(null);
                    field.form?.get('agencyZip')?.patchValue(null);
                    field.form?.get('agencyTown')?.patchValue(null);
                    field.form?.get('agencyProvince')?.patchValue(null);
                    
                    this.http.get<any>('api/items/insurancesOffices').subscribe(response => {
                      console.log(response.data);
                      let x = response.data;

                      console.log("ID ASSICURAZIONE",insuranceId)
                      const filteredData = x.filter((item: any) => item.agencyInsuranceAssociated === insuranceId);
                      console.log(filteredData);
                      xoptions = filteredData.map((item: any) => ({
                        label: item.agencyDescription,
                        value: item.id,
                      }));
                      console.log(xoptions);   
                      field.props!.options = [...xoptions];    
                      console.log(field.props!.options)   
                       // Notify Formly about the change
                       this.cdr.detectChanges()
                    });
                  }
                  },
                },*/
                /*hooks: {
                  onInit: field => {
                    
                    // Load insuranceOffice Based on insuranceId
                    let selectedInsurance = this.form.get('selectedInsurance');
                    
                      selectedInsurance?.valueChanges.subscribe(async (selectedValue: string) => {

                      const insuranceSelectedfield = field.form?.get('selectedInsurance');
                      const insuranceId = insuranceSelectedfield?.value;
                      console.log(insuranceId);
                      field.form?.get('selectedAgency')?.patchValue(null);
                      field.form?.get('agencyDescription')?.patchValue(null);
                      field.form?.get('agencyAddress')?.patchValue(null);
                      field.form?.get('agencyPhone')?.patchValue(null);
                      field.form?.get('agencyEmail')?.patchValue(null);
                      field.form?.get('agencyZip')?.patchValue(null);
                      field.form?.get('agencyTown')?.patchValue(null);
                      field.form?.get('agencyProvince')?.patchValue(null);

                      this.http.get<any>('api/items/insurancesOffices').subscribe(response => {
                        console.log(response.data);
                        let x = response.data;

                        console.log("ID ASSICURAZIONE",insuranceId)
                        const filteredData = x.filter((item: any) => item.agencyInsuranceAssociated === insuranceId);
                        console.log(filteredData);
                        const xoptions = filteredData.map((item: any) => ({
                          label: item.agencyDescription,
                          value: item.id,
                        }));
                        console.log(xoptions);
                       // field.props!.options = [...xoptions];
                      });
                    });*/
                  
                    // Popolate Formfield Fields of insuranceOffice On selection
                    /*const control = field.formControl;
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if(selectedValue) {
                      console.log(selectedValue)
                      this.http.get<[]>('api/items/insurancesOffices/'+ selectedValue).subscribe((data: any[]) => {
                        let x: any = data; // Assign the array received from the API to this.Options
                        let agencies = x['data'];
                        let row = agencies;
                        console.log(row);
                        field.form?.get('agencyDescription')?.patchValue(row.agencyDescription);
                        field.form?.get('agencyAddress')?.patchValue(row.agencyAddress);
                        field.form?.get('agencyPhone')?.patchValue(row.agencyPhone);
                        field.form?.get('agencyEmail')?.patchValue(row.agencyEmail);
                        field.form?.get('agencyZip')?.patchValue(row.agencyZip);
                        field.form?.get('agencyTown')?.patchValue(row.agencyTown);
                        field.form?.get('agencyProvince')?.patchValue(row.agencyProvince);
                        this.selectedInsuranceOffice = row;
                      });
                    }
                    });*/
