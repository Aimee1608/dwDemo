/**
 * Created by jiangqian on 2017/3/17.
 */
var ProvinceData = {
    JSonData:'',
    init:function(provinceSelectID, citySelectID, agencyID){

       ProvinceData.JSonData = Dealer;

        if(provinceSelectID){
            ProvinceData.BindProvince(provinceSelectID);
        }
        if(provinceSelectID&&citySelectID){
            $('#'+provinceSelectID).change(function(){
                ProvinceData.BindCity(provinceSelectID, citySelectID);
                ProvinceData.BindAgency(provinceSelectID, citySelectID, agencyID);
                $(this).addClass('changed');
            });
        }
        if(provinceSelectID&&citySelectID&&agencyID){
            $('#'+citySelectID).change(function(){
                $(this).addClass('changed');
                ProvinceData.BindAgency(provinceSelectID, citySelectID, agencyID);
            })
        }

    },
    BindProvince:function(provinceSelectID){
        if (ProvinceData.JSonData && ProvinceData.JSonData.length > 0) {
            var masterObj = document.getElementById(provinceSelectID);
            if (masterObj && masterObj.options) {
                masterObj.options.length = 0;
                masterObj.options[0] = new Option("选择省份", 0);
                for (var i = 0; i < ProvinceData.JSonData.length; i++) {
                    masterObj.options[masterObj.options.length] = new Option(ProvinceData.JSonData[i].dealer_name, ProvinceData.JSonData[i].dealer_id);
                }
            }
        }
    },
    BindCity:function(provinceSelectID, citySelectID){
        var temp = document.getElementById(provinceSelectID); if (!temp) { return; }
        temp = temp.options[document.getElementById(provinceSelectID).selectedIndex]; if (!temp) { return; }
        var masterObjid = temp.value;
        console.log(masterObjid);
        if (masterObjid && masterObjid > 0) {
            var subAreaObj = document.getElementById(citySelectID);
            //console.log(subAreaObj);
            subAreaObj.options.length = 0;
            subAreaObj.options[subAreaObj.options.length] = new Option("选择城市", 0);
            for (var i = 0; i < ProvinceData.JSonData.length; i++) {
                if (ProvinceData.JSonData[i].dealer_id == masterObjid) {
                    for (var j = 0; j < ProvinceData.JSonData[i].city.length; j++) {
                        subAreaObj.options[subAreaObj.options.length] = new Option(ProvinceData.JSonData[i].city[j].dealer_name, ProvinceData.JSonData[i].city[j].dealer_id);
                    }
                }
            }
        }
        else if (masterObjid && masterObjid == 0) {
            var subAreaObj = document.getElementById(citySelectID);
            subAreaObj.options.length = 0;
            subAreaObj.options[subAreaObj.options.length] = new Option("选择城市", 0);
        }
    },
    BindAgency:function(provinceSelectID, citySelectID, agencyID){
        var temp = document.getElementById(provinceSelectID); if (!temp) { return; }
        temp = temp.options[document.getElementById(provinceSelectID).selectedIndex]; if (!temp) { return; }
        var provinceId = temp.value;

        var temp = document.getElementById(citySelectID); if (!temp) { return; }
        temp = temp.options[document.getElementById(citySelectID).selectedIndex]; if (!temp) { return; }
        var cityId = temp.value;
        if (provinceId && provinceId > 0 && cityId && cityId > 0) {
            var subAreaObj = document.getElementById(agencyID);
            subAreaObj.options.length = 0;
            subAreaObj.options[subAreaObj.options.length] = new Option("选择经销商", 0);
            for (var i = 0; i < ProvinceData.JSonData.length; i++) {
                if (ProvinceData.JSonData[i].dealer_id == provinceId) {
                    var t1 = ProvinceData.JSonData[i];
                    for (var j = 0; j < t1.city.length; j++) {
                        if (t1.city[j].dealer_id == cityId) {
                            var t2 = t1.city[j];
                            for (var k = 0; k < t2.dealer.length; k++) {
                                subAreaObj.options[subAreaObj.options.length] =
                                    new Option(t2.dealer[k].dealer_name, t2.dealer[k].dealer_id);
                            }
                            return;
                        }
                    }
                }
            }
        }
        else if ((provinceId && provinceId == 0) || (cityId && cityId == 0)) {
            var subAreaObj = document.getElementById(agencyID);
            if (subAreaObj != null) {
                subAreaObj.options.length = 0;
                subAreaObj.options[subAreaObj.options.length] = new Option("选择经销商", 0);
            }
        }
    }
};
