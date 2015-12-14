function getUIPropSchema(dataType, uiType, label, defaultVal, allowEdit, isMandatory, maxLength, numDecimals, autoSuggestURL, allVals) {
    var cp = JSON.parse(sCPSchema);
    cp.dataType = dataType;
    cp.uiType = uiType;
    cp.label = label;
    cp.defaultVal = defaultVal;
    cp.allowEdit = allowEdit;
    cp.isMandatory = isMandatory;
    cp.maxLength = maxLength;
    cp.numDecimals = numDecimals;
    cp.autoSuggestURL = autoSuggestURL;
    cp.allVals = allVals;
    return cp;
}

//Note: db elements will be used for ETL. There will be more elements introduced in future (e.g. flip).
//TODO: in actual application, this will be fetched from server. If there is one server for each client, it will be fetched directly, else based on tenant id.
//TODO: There will be some ids associated to various properties which will be introduced in actual application.
var settings_abm = {
    setup: {
        primary: {
            req_name: {
                //TODO: name generation has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requsition Name', '', true, true, 200, null, null, null),
                db: {}
            },
            req_number: {
                //TODO: number generation has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requsition Number', 'test', false, true, null, null, null, null),
                db: {}
            },
            requester: {
                //TODO: this will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requester', 'Admin', false, true, null, null, null, null),
                db: {}
            },
            obo: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Create on Behalf of (OBO)', '', true, false, null, null, 'https://UsersFromSameBU', null),
                db: {}
            },
            shipto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Ship to', 'Navi Mumbai', true, true, null, null, 'https://AvailableShippingLocations', null),
                db: {}
            },
            shipto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Ship to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, true, null, null, null, null),
                db: {}
            },
            billto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Bill to', 'Navi Mumbai', true, false, null, null, 'https://AvailableBillingLocations', null),
                db: {}
            },
            billto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Bill to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, false, null, null, null, null),
                db: {}
            },
            currency: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Currency', 'USD', false, true, null, null, null, null),
                db: {}
            }
        },
        custom: {
            erp_order_type: {
                ui: getUIPropSchema('string', 'ddlist', 'ERP Order Type', null, true, false, null, null, null, ['Internal Order', 'Sales Order', 'Cost Centre Order', 'MRP Order', 'Work Order']),
                db: {}
            },
            work_order: {
                //TODO: Think about multi-property validations here.
                ui: getUIPropSchema('string', 'input', 'Work Order', null, true, false, 500, null, null, null),
                db: {}
            },
            deliverto: {
                ui: getUIPropSchema('string', 'input', 'Deliver to', null, true, false, 2000, null, null, null),
                db: {}
            },
            is_urgent: {
                ui: getUIPropSchema('bool', 'chkbox', 'Mark as Urgent', false, true, true, null, null, null, null),
                db: {}
            },
            district: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'District', '8032-LL012-Atlanta', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            job: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Job', 'Allied Waste Svc (BFI) - Lawre', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            }
        }
    },
    item: {
        primary: {
            line_number: {
                //TODO: Default value has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('int', 'input', 'Line No.', 1, false, true, null, 0, null, null),
                db: {}
            },
            item_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Item No.', '', true, false, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            partner_item_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Partner Item No.', '', true, false, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            item_name: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Item', '', true, true, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            quantity: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Quantity', 1, true, true, null, 0, null, null),
                db: {}
            },
            uom: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'UOM', 'Each', true, true, null, null, 'https://ListofUOMs', null),
                db: {}
            },
            unit_price: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Unit Price', null, true, true, null, 2, null, null),
                db: {}
            },
            is_tax_exempt: {
                //Note: Bool will have 2 to 3 possible display values, first one will be for true.
                ui: getUIPropSchema('bool', 'ddlist', 'Tax Exempt', false, true, true, null, null, null, ['Yes', 'No']),
                db: {}
            },
            shipping: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Shipping & Freight', null, true, false, null, 2, null, null),
                db: {}
            },
            other_charges: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Other Charges', null, true, false, null, 2, null, null),
                db: {}
            },
            requested_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                ui: getUIPropSchema('date', 'input', 'Requested Date', new Date(), false, true, null, null, null, null),
                db: {}
            },
            need_by_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'Requested Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            service_type: {
                ui: getUIPropSchema('string', 'ddlist', 'Service Type', 'Fixed', true, true, null, null, null, ['Fixed', 'Variable']),
                db: {}
            },
            start_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'Start Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            end_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'End Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            efforts: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Efforts', 1, true, true, null, 0, null, null),
                db: {}
            },
            partner_name: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Partner Name', '', true, true, null, null, 'https://AvailablePartners', null),
                db: {}
            },
            partner_code: {
                //TODO: think about handling this in object manner.
                ui: getUIPropSchema('string', 'input', 'Partner Code', '', false, false, null, null, null, null),
                db: {}
            },
            manufacturer_name: {
                ui: getUIPropSchema('string', 'input', 'Manufacturer Name', '', true, false, 200, null, null, null),
                db: {}
            },
            manufacturer_part_number: {
                ui: getUIPropSchema('string', 'input', 'Manufacturer Part Number', '', true, false, 100, null, null, null),
                db: {}
            },
            shipto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Ship to', 'Navi Mumbai', true, true, null, null, 'https://AvailableShippingLocations', null),
                db: {}
            },
            shipto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Ship to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, true, null, null, null, null),
                db: {}
            },
            category: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: Default value will come from item, will integrate in actual application.
                ui: getUIPropSchema('string', 'treepop', 'Category', 'IT', true, true, null, null, 'https://GetCategoryTree', null),
                db: {}
            },
            contract_number: {
                ui: getUIPropSchema('string', 'input', 'Contract Number', '', true, false, 100, null, null, null),
                db: {}
            },
            contract_name: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Contract Name', '', false, false, null, null, null, null),
                db: {}
            },
            contract_expiry_date: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('date', 'input', 'Contract Expiry Date', '', false, false, null, null, null, null),
                db: {}
            },
            contract_value: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('int', 'input', 'Contract Value', '', false, false, null, null, null, null),
                db: {}
            },
            payment_terms: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Payment Terms', '', false, false, null, null, null, null),
                db: {}
            }
        },
        custom: {
            deliverto: {
                ui: getUIPropSchema('string', 'input', 'Deliver to', null, true, false, 2000, null, null, null),
                db: {}
            },
            shipping_method: {
                ui: getUIPropSchema('string', 'ddlist', 'Shipping Method', null, true, false, null, null, null, ['Best Available', 'FedEx Opti Freight (No: 477648983)']),
                db: {}
            },
            procurement_option: {
                ui: getUIPropSchema('string', 'ddlist', 'Procurement Option', null, true, true, null, null, null, ['Procurable', 'From Inventory']),
                db: {}
            },
            capitalized: {
                //Note: Bool will have 2 to 3 possible display values, first one will be for true.
                ui: getUIPropSchema('bool', 'ddlist', 'Capitalized', false, true, true, null, null, null, ['Yes', 'No']),
                db: {}
            },
            billable: {
                //Note: Bool will have 2 to 3 possible display values, first one will be for true.
                ui: getUIPropSchema('bool', 'ddlist', 'Billable', null, true, true, null, null, null, ['Yes', 'No']),
                db: {}
            }
        }
    },
    split: {
        primary: {
            quantity: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Quantity', 1, true, true, null, 2, null, null),
                db: {}
            },
            type: {
                ui: getUIPropSchema('string', 'ddlist', 'Type', '#', true, true, null, null, null, ['#', '%']),
                db: {}
            }
        },
        custom: {
            requester: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requester', 'Admin', false, true, null, null, null, null),
                db: {}
            },
            segment: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Segment', 'Building Energy Solutions-ESS', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            division: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Division', 'ENG-Building Energy Solutions DV', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            super_region: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Super Region', 'EEB-ABM Bldg. Energy Sol ABES', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            region: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Region', 'ELS-ABES ABM Bldg Solutions ABS', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            super_branch: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Super Branch', 'ABM Building Solutions, LLC-E35', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            branch: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Branch', 'AGS Hopkinsville-80150', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            district: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'District - SSID', '8032-LL012-Atlanta', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            job: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Job', 'Allied Waste Svc (BFI) - Lawre', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            gl_account: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'GL Account', 'AcctReceivableAcct-8032.C0040.130000000', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            }
        }
    }
};

var settings_camc = {
    setup: {
        primary: {
            req_name: {
                //TODO: name generation has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requsition Name', '', true, true, 200, null, null, null),
                db: {}
            },
            req_number: {
                //TODO: number generation has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requsition Number', 'test', false, true, null, null, null, null),
                db: {}
            },
            requester: {
                //TODO: this will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requester', 'Admin', false, true, null, null, null, null),
                db: {}
            },
            obo: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Create on Behalf of (OBO)', '', true, false, null, null, 'https://UsersFromSameBU', null),
                db: {}
            },
            shipto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Ship to', 'Navi Mumbai', true, true, null, null, 'https://AvailableShippingLocations', null),
                db: {}
            },
            shipto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Ship to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, true, null, null, null, null),
                db: {}
            },
            billto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Bill to', 'Navi Mumbai', true, false, null, null, 'https://AvailableBillingLocations', null),
                db: {}
            },
            billto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Bill to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, false, null, null, null, null),
                db: {}
            },
            currency: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Currency', 'USD', false, true, null, null, null, null),
                db: {}
            }
        },
        custom: {
            deliverto: {
                ui: getUIPropSchema('string', 'input', 'Deliver to', null, true, false, 2000, null, null, null),
                db: {}
            },
            is_urgent: {
                ui: getUIPropSchema('bool', 'chkbox', 'Mark as Urgent', true, true, true, null, null, null, null),
                db: {}
            },
            corporation: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Corporation', '10-CAMC', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            }
        }
    },
    item: {
        primary: {
            line_number: {
                //TODO: Default value has a logic associated to it. Will integrate in actual application.
                ui: getUIPropSchema('int', 'input', 'Line No.', 1, false, true, null, 0, null, null),
                db: {}
            },
            item_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Item No.', '', true, false, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            partner_item_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Partner Item No.', '', true, false, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            item_name: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'autosuggest', 'Item', '', true, true, null, null, 'https://ListofAccessibleItems', null),
                db: {}
            },
            quantity: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Quantity', 1, true, true, null, 0, null, null),
                db: {}
            },
            uom: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'UOM', 'Each', true, true, null, null, 'https://ListofUOMs', null),
                db: {}
            },
            unit_price: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Unit Price', null, true, true, null, 2, null, null),
                db: {}
            },
            is_tax_exempt: {
                //Note: Bool will have 2 to 3 possible display values, first one will be for true.
                ui: getUIPropSchema('bool', 'ddlist', 'Tax Exempt', false, true, true, null, null, null, ['Yes', 'No']),
                db: {}
            },
            shipping: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Shipping & Freight', null, true, false, null, 2, null, null),
                db: {}
            },
            other_charges: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Other Charges', null, true, false, null, 2, null, null),
                db: {}
            },
            requested_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                ui: getUIPropSchema('date', 'input', 'Requested Date', new Date(), false, true, null, null, null, null),
                db: {}
            },
            need_by_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'Requested Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            service_type: {
                ui: getUIPropSchema('string', 'ddlist', 'Service Type', 'Fixed', true, true, null, null, null, ['Fixed', 'Variable']),
                db: {}
            },
            start_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'Start Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            end_date: {
                //TODO: Think about date validations (including custom). At least put default more than today.
                //TODO: Default value will have a logic associated to it, will be implemented later
                ui: getUIPropSchema('date', 'calendar', 'End Date', new Date(), true, true, null, null, null, null),
                db: {}
            },
            efforts: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Efforts', 1, true, true, null, 0, null, null),
                db: {}
            },
            partner_name: {
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Partner Name', '', true, true, null, null, 'https://AvailablePartners', null),
                db: {}
            },
            partner_code: {
                //TODO: think about handling this in object manner.
                ui: getUIPropSchema('string', 'input', 'Partner Code', '', false, false, null, null, null, null),
                db: {}
            },
            manufacturer_name: {
                ui: getUIPropSchema('string', 'input', 'Manufacturer Name', '', true, false, 200, null, null, null),
                db: {}
            },
            manufacturer_part_number: {
                ui: getUIPropSchema('string', 'input', 'Manufacturer Part Number', '', true, false, 100, null, null, null),
                db: {}
            },
            shipto: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: url is placeholder for now, will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Ship to', 'Navi Mumbai', true, true, null, null, 'https://AvailableShippingLocations', null),
                db: {}
            },
            shipto_address: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Ship to Address', 'GEP, Building 3, Mindspace, Airoli, Navi Mumbai', false, true, null, null, null, null),
                db: {}
            },
            category: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: Default value will come from item, will integrate in actual application.
                ui: getUIPropSchema('string', 'treepop', 'Category', 'IT', true, true, null, null, 'https://GetCategoryTree', null),
                db: {}
            },
            contract_number: {
                ui: getUIPropSchema('string', 'input', 'Contract Number', '', true, false, 100, null, null, null),
                db: {}
            },
            contract_name: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Contract Name', '', false, false, null, null, null, null),
                db: {}
            },
            contract_expiry_date: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('date', 'input', 'Contract Expiry Date', '', false, false, null, null, null, null),
                db: {}
            },
            contract_value: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('int', 'input', 'Contract Value', '', false, false, null, null, null, null),
                db: {}
            },
            payment_terms: {
                //TODO: this can be handled as object type, need to think more on this.
                ui: getUIPropSchema('string', 'input', 'Payment Terms', '', false, false, null, null, null, null),
                db: {}
            }
        },
        custom: {
            deliverto: {
                ui: getUIPropSchema('string', 'input', 'Deliver to', null, true, false, 2000, null, null, null),
                db: {}
            },
            shipping_method: {
                ui: getUIPropSchema('string', 'ddlist', 'Shipping Method', null, true, false, null, null, null, ['Best Available', 'FedEx Opti Freight (No: 477648983)']),
                db: {}
            },
            procurement_option: {
                ui: getUIPropSchema('string', 'ddlist', 'Procurement Option', null, true, true, null, null, null, ['Procurable', 'From Inventory']),
                db: {}
            },
            inventory_type: {
                ui: getUIPropSchema('string', 'ddlist', 'Inventory Type', 'Not Applicable', true, true, null, null, null, ['Not Applicable', 'Stock', 'Non-Stock']),
                db: {}
            }
        }
    },
    split: {
        primary: {
            quantity: {
                //TODO: Think about numerical validations (including custom). At least put default positive etc validations.
                ui: getUIPropSchema('decimal', 'input', 'Quantity', 1, true, true, null, 2, null, null),
                db: {}
            },
            type: {
                ui: getUIPropSchema('string', 'ddlist', 'Type', '#', true, true, null, null, null, ['#', '%']),
                db: {}
            }
        },
        custom: {
            requester: {
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'input', 'Requester', 'Admin', false, true, null, null, null, null),
                db: {}
            },
            corporation: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Corporation', '10-CAMC', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            department: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Department', '42023-2 EAST', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            account_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Account Number', '10200-Balance Sheet Account', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            sub_account_number: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Sub-Account Number', '0000-0000', true, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            activity_code: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Project/Acivity Code', '100-PETTY CASH- PHYSICIAN RECRUIT', false, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            },
            account_category: {
                //TODO: url is placeholder for now, will integrate in actual application.
                //TODO: also think about passing appropriate parameters in call.
                //TODO: default value will come from user in session. Will integrate in actual application.
                ui: getUIPropSchema('string', 'autosuggest', 'Account Category', '', false, true, null, null, 'https://ListofCorrespondingOrgEntity', null),
                db: {}
            }
        }
    }
};










