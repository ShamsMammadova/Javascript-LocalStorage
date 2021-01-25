window.onload = function () {
    if (localStorage.getItem("basket") === null) {
        localStorage.setItem("basket", JSON.stringify([]));
    }
    UpdateBasketIcon();
    const productButtons = document.querySelectorAll('.btn-product');
    const basket = JSON.parse(localStorage.getItem("basket"));

    [...productButtons].forEach(pro => {
        pro.onclick = function (e) {
            e.preventDefault();
            const proId = this.parentElement.getAttribute("data-id");
            const basketElement = basket.find(el => {
                return el.id === proId;
            })
            if (basketElement === undefined) {
                basket.push({
                    id: proId,
                    count: 1,
                    name: pro.previousElementSibling.previousElementSibling.innerText,
                    image: pro.parentElement.previousElementSibling.getAttribute("src")
                })
            }
            else {
                basketElement.count++;
            }
            //update localstorage to include new product
            localStorage.setItem("basket", JSON.stringify(basket));
            UpdateBasketIcon();
        }
    })
    basket.forEach(el => {
        const tr = document.createElement('tr');
        const proImgTd = document.createElement('td');
        const proImg = document.createElement('img');
        const proNameTd = document.createElement('td');
        const proCount = document.createElement('td');
        const remove = document.createElement('td');
        const a = document.createElement('a');
        a.href = "#"
        a.classList = "remove"
        a.id = el.id
        a.innerHTML = '<i class="fas fa-trash-alt"></i>'
        remove.appendChild(a)
        proCount.innerText = el.count;
        proImg.src = el.image;
        proImgTd.appendChild(proImg);
        proNameTd.innerText = el.name;
        tr.appendChild(proImgTd);
        tr.appendChild(proNameTd);
        tr.appendChild(proCount);
        tr.appendChild(remove);
        document.querySelector('.table').lastElementChild.appendChild(tr)
    })
    let removeBtn = document.querySelectorAll(".remove")
    removeBtn.forEach(btn => {
        btn.onclick = function(e){
            e.preventDefault();
            let id = this.id;
            let newbasket = [];
            basket.forEach(element => {
                if (element.id != id) {
                    newbasket.push(element)
                }
            });
            localStorage.clear();
            localStorage.setItem("basket", JSON.stringify(newbasket));
            window.location.reload(true)
        }
    });
}



function UpdateBasketIcon() {
    const basket = JSON.parse(localStorage.getItem("basket"));
    document.querySelector('#basket-count').innerText = basket.length;
    // document.querySelector('#basket-count').innerText = basket.reduce((t, p) => t + p.count, 0);
}