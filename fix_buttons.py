# Read file
with open(r'c:\Projects\murugdur1\client\src\pages\Home.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Replace lines 337 and 340 to add bg-black and text-white
lines[336] = '                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\r\n'
lines[339] = '                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\r\n'

# Write back
with open(r'c:\Projects\murugdur1\client\src\pages\Home.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Done! Buttons are now black with white text.")
