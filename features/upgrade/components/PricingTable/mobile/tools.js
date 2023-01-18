export function getMobileOrderArray(data){
  let invalidParameterValue = false;

  let orderArray = data.plans.map((plan, index)=>{
    if(plan.mobileOrder === undefined || isNaN(plan.mobileOrder)){
      invalidParameterValue = true;
    }else{
      return plan.mobileOrder;
    }
  });

  if(invalidParameterValue || containsDuplicates(orderArray)){
    console.log("Pricing table error: If you want to change the order of mobile tabs, all 'plans' objects must have 'mobileOrder' parameter.");
    return getArrayOfNum(data.plans.length);
  }else{
    orderArray.sort(function(a, b){return a-b});
  }

  return orderArray.map(value => {
    for(let i=0; i < data.plans.length; i++){
      if(data.plans[i].mobileOrder === value) return i;
    }
  });
}

function getArrayOfNum(n){
  let arr = [];
  for(let i=0; i<n; i++) arr.push(i);
  return arr;
}

function containsDuplicates(array) {
  return array.length !== new Set(array).size;
}