document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('volumeForm').addEventListener('input', calculateTotal);

function addRow() {
    const tableBody = document.querySelector('#productTable tbody');
    const newRow = document.createElement('tr');
    newRow.classList.add('productRow');
    
    newRow.innerHTML = `
        <td data-label="EN (cm)"><input type="number" class="width" placeholder="En (cm)" required></td>
        <td data-label="BOY (cm)"><input type="number" class="length" placeholder="Boy (cm)" required></td>
        <td data-label="YÜKSEKLİK (cm)"><input type="number" class="height" placeholder="Yükseklik (cm)" required></td>
        <td data-label="ADET"><input type="number" class="quantity" placeholder="Adet" required></td>
        <td data-label="HACİM"><input type="text" class="volume" placeholder="Hacim (1 adet m³ cinsinden)" readonly></td>
    `;
    
    tableBody.appendChild(newRow);
}

function calculateTotal() {
    let totalVolume = 0;
    let totalWeight = 0;

    const rows = document.querySelectorAll('.productRow');

    rows.forEach(row => {
        const width = parseFloat(row.querySelector('.width').value) || 0;
        const length = parseFloat(row.querySelector('.length').value) || 0;
        const height = parseFloat(row.querySelector('.height').value) || 0;
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;

        if (width > 0 && length > 0 && height > 0 && quantity > 0) {
            const volume = (width * length * height) / 1000000; 
            row.querySelector('.volume').value = (volume * quantity).toFixed(2);

            totalVolume += volume * quantity;

            const transportMethod = document.getElementById('transport').value;

            let weight = 0;
            if (transportMethod === 'havayolu') {
                weight = (volume * quantity * 1000000) / 6000; 
            } else if (transportMethod === 'karayolu') {
                weight = (volume * quantity * 1000000) / 3000; 
            } else if (transportMethod === 'denizyolu') {
                weight = volume * quantity * 1000;
            }

            totalWeight += weight;
        }
    });

    document.getElementById('totalVolume').textContent = totalVolume.toFixed(2) ;
    document.getElementById('totalWeight').textContent = totalWeight.toFixed(2) ;
}

