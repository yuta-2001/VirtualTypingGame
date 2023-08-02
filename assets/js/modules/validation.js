export { currentErrors };

const currentErrors = {
    name: 'Name is required.',
    email: 'Email is required.',
};

const validationRules = {
    name: function(value) {
      return value ? '' : 'Name is required.';
    },
    email: function(value) {
      if (!value) {
        return 'Email is required.';
      }
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        return 'Email is not valid.';
      }
      return '';
    }
};

const validate = (field) => {
    let value = document.getElementById(field).value;
    let error = validationRules[field](value);
  
    // エラーメッセージの表示または削除
    document.getElementById(field + '-error').innerText = error;
  
    return error;
}

for (let field in validationRules) {
    document.getElementById(field).addEventListener('keyup', (function(field) {
        return  function() {
                    let error = validate(field);

                    if (error) {
                        currentErrors[field] = error;
                    } else {
                        delete currentErrors[field];
                    }
                };
    })(field));
}

