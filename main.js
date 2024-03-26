// BUTON VE İNPUTLARI ÇEKME
const spendingInput = document.querySelector("#spending-input")
const priceInput = document.querySelector("#price-input")
const formBtn = document.querySelector(".btn")
const list = document.querySelector(".list")
const totalInfo = document.querySelector("#total-info")
const statusCheck = document.querySelector("#status-input")
const selectFilter = document.querySelector("#filter-select")
// console.log(spendingInput, priceInput, formBtn)

formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter)

let total = 0;
function updateTotal (price){
    // TOTAL VE VERİLEN DEĞERİ TOPLAMA
    total += Number(price);
    // console.log(price)
    totalInfo.innerText = total;
    // console.log(total)
}

// GİDER OLUŞTURMA
function addExpense(e){
    e.preventDefault()
    // console.log("tık")

    // console.log(spendingInput.value , priceInput.value)

    // ESKİ KULLANIM PriceInput === ""
    if(!priceInput.value || !spendingInput.value){
        alert("Boş Gider Eklenemez")
        // FONKSİYONU DURDURMAK İÇİN
        return;
    }

    // 1- KULLANICI VERİ GİRDİĞİNDE VE EKLE DEDİĞİNDE DİV OLUŞTUR
    const spendingDiv = document.createElement("div");

    // 2- CLASS EKLEME
    spendingDiv.classList.add("spending");

    // console.dir(statusCheck)
    if(statusCheck.checked){
        spendingDiv.classList.add("payed");
    }

    // 3- İÇERİĞİNİ AYARLAMA(DİV)
    spendingDiv.innerHTML = `
    <h2>${spendingInput.value}:</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="images/payment.png" alt="">
        <img id="remove" src="images/delete.png" alt="">
    </div>`

    // 4- LİSTEYE ELEMAN EKLEME
    list.appendChild(spendingDiv);

    // TOPLAMA GÜNCELLE
    updateTotal(priceInput.value);

    // FORMU TEMİZLEME
    spendingInput.value = "";
    priceInput.value = "";
}
function handleClick(e){
    const element = e.target
    // console.dir(element)

    if(element.id === "remove"){

        // parentElemen: TIKLANILAN ELEMENIN KAPSAYICISINA ULAŞMA(KAPSAYICININ KAPSAYICISI)
    const wrapper = element.parentElement.parentElement
    // console.log(wrapper)

    // SİLİNEN ELEMANIN FİYATINI ALMA
    const deletePrice = wrapper.querySelector("#value").innerText
    Number(deletePrice.innerText)

    // SİLİNEN ELEMANIN FİYATINI TOPLAMA ÇIKARMA
    // updateTotal i GÜNCELLE
    updateTotal(- Number(deletePrice))

    // KAPSAYICIYI KALDIR
    wrapper.remove()
    }
}
// FİLTRELEME İŞLEMLERİ
function handleFilter(e){
    console.log(e.target.value)

    // ! childNodes
    // parentElement ELEMENTİN TERSİNE KAPSAYICIYA
    // DOĞRU DEĞİLDE ELEMANA DOĞRU İLERLEME
    const items = list.childNodes;
    items.forEach((item) => {
        switch(e.target.value){
            case "all":
                item.style.display = "flex";
                break;

                case "payed":
                // CLASSINDA YALNIZCA "PAYED" OLANLAR SİLİNSİN
                if (!item.classList.contains("payed")){
                    item.style.display = "none";
                } else{
                    item.style.display = "flex";
                }
                break;

                case "not-payed":
                    if (item.classList.contains("payed")){
                        item.style.display = "none"
                    } else{
                        item.style.display = "flex"
                    }
                    break;
        }
    });
}