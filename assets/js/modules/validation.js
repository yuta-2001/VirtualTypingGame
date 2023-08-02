export { validate, validationRules };

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
    var value = document.getElementById(field).value;
    var error = validationRules[field](value);
  
    // エラーメッセージの表示または削除
    document.getElementById(field + '-error').innerText = error;
  
    return error;
}

