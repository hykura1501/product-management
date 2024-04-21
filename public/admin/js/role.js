const tableRole = document.querySelector(".table-role");
if (tableRole) {
  const inputDataName = tableRole.querySelectorAll("[data-name]");
  const btnSubmit = document.querySelector("[btn-submit]");
  const inputId = tableRole.querySelectorAll("[data-name=id]");
  btnSubmit.addEventListener("click", () => {
    let role = [];
    inputId.forEach((item) => {
      role.push({
        id: item.value,
        permissions: [],
      });
    });
    inputDataName.forEach((item) => {
      const name = item.getAttribute("data-name");
      if (name != "id") {
        const inputs = item.querySelectorAll("input");
        inputs.forEach((input, index) => {
          if (input.checked) {
            role[index].permissions.push(name);
          }
        });
      }
    });
    const permissions = JSON.stringify(role)
    const formEditRole = document.querySelector("[form-edit-role]")
    const inputPermissions = formEditRole.querySelector("[input-permissions]")
    inputPermissions.value = permissions
    formEditRole.submit()
  });
}

//Load permissions
if (tableRole) {
  const recordsPermissions = document.querySelector("[records-permissions]")
  const permissions = JSON.parse(recordsPermissions.getAttribute("records-permissions"))
  const inputDataName = tableRole.querySelectorAll("[data-name]")
  permissions.forEach((item, index) => {
    inputDataName.forEach(input => {
      const name = input.getAttribute("data-name")
      if(name !== "id") {
        const checkboxs = input.querySelectorAll("input")
        checkboxs[index].checked = item.permissions.includes(name)
      }
    })
  })
}
//End Load permissions