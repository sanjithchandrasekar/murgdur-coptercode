$src = "C:/Users/HP/.gemini/antigravity/brain/1b84bb58-0535-46b0-ab69-48735cdc3f65"
$dest = "c:\Projects\murugdur1\client\src\assets\images"

Copy-Item "$src/royal_watch_1768919976789.png" "$dest/royal_watch.png" -Force
Copy-Item "$src/royal_perfume_1768920002655.png" "$dest/royal_perfume.png" -Force
Copy-Item "$src/royal_jewellery_1768920027073.png" "$dest/royal_jewellery.png" -Force
Copy-Item "$src/royal_saree_1768920048546.png" "$dest/royal_saree.png" -Force
Copy-Item "$src/royal_sherwani_1768920069876.png" "$dest/royal_sherwani.png" -Force
Copy-Item "$src/royal_belt_1768920111670.png" "$dest/royal_belt.png" -Force
Copy-Item "$src/royal_wallet_1768920131880.png" "$dest/royal_wallet.png" -Force
Copy-Item "$src/royal_sunglasses_1768920157052.png" "$dest/royal_sunglasses.png" -Force
Copy-Item "$src/royal_heels_1768920179651.png" "$dest/royal_heels.png" -Force
Copy-Item "$src/royal_gown_1768920205538.png" "$dest/royal_gown.png" -Force

Write-Host "Images copied successfully"
