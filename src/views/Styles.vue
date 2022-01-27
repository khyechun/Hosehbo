<template>
  <div class="container">
    <div class="row">
      <div class="col-6"><button class="btn btn-black">Button</button></div>
      <div class="col-6"><textarea disabled> <button class="btn btn-black">Button</button> </textarea></div>
      <div class="col-6"><button class="btn btn-black rounded-pill">Rounded Button</button></div>
      <div class="col-6"><textarea disabled> <button class="btn btn-black rounded-pill">Rounded Button</button> </textarea></div>

      <div class="col-6"><button class="btn btn-black rounded-pill btn-inactive">Inactive pill</button></div>
      <div class="col-6"><textarea disabled> <button class="btn btn-black rounded-pill btn-inactive">Inactive pill</button></textarea></div>

      <div class="col-6"><input placeholder="Type in here..." class="form-control"></div>
      <div class="col-6"><textarea disabled> <input placeholder="Type in here..." class="form-control"> </textarea></div>

      <div class="col-6">
          
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Type in here...">
            <button class="btn btn-black" type="button">Button</button>
        </div>
      </div>
      <div class="col-6"><textarea disabled><div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Type in here...">
            <button class="btn btn-black" type="button">Button</button>
        </div></textarea></div>
        <div class="col-6">
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="input_1" name="input_1" id='input_1' required />
            <label for="input_1" class="form__label">Email</label>
        </div>
    </div>
    <div class="col-6">
        <textarea disabled><div class="form__group field">
            <input type="input" class="form__field" placeholder="input_1" name="input_1" id='input_1' required />
            <label for="input_1" class="form__label">Email</label>
        </div></textarea>
    </div>
    <div class="col-6"><img style="width:30px;" src="@/assets/options.svg" alt="Options SVG"/></div>
    <div class="col-6"><textarea disabled><img style="width:30px;" src="@/assets/options.svg" alt="Options SVG"/></textarea></div>
    </div>



  </div>
</template>

<style scoped>
.col-6{
    min-height:100px;
}
textarea{
    font-size:12px;
    height:90%;
    width:100%;
}

</style>