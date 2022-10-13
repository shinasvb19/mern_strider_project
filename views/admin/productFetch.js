const category = document.getElementById("category_id");

category.addEventListener("change", function () {
    let categoryId = category.value;

    const subCategoryField = document.getElementById('subcategory');
    let option = '';
    fetch('/products/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId })
    }).then(res => res.json()).then(data => {
        let subCategory = data.subcategory;
        if (subCategory.length > 0) {
            option += `<select id="subCategoryId" name="productSubCategoryId" class="form-control">`;
            subCategory.forEach((eachSubCategory) => {
                option += `<option value="${eachSubCategory._id}">${eachSubCategory.subcategory}</option>`;
            });
            option += `</select>`;
            subCategoryField.innerHTML = option;
        } else {
            subCategoryField.innerHTML = `<select id="subCategoryId" name="productSubCategoryId" class="form-control"><option value="">Choose..</option></select>`;
        }

    })
});