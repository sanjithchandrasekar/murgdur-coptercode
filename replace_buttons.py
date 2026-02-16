# Read file
with open(r'c:\Projects\murugdur1\client\src\pages\Home.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and replace lines 337-352
new_buttons = [
    '                        <button className="px-8 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all">\r\n',
    '                            For Her\r\n',
    '                        </button>\r\n',
    '                        <button className="px-8 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all">\r\n',
    '                            For Him\r\n',
    '                        </button>\r\n',
]

# Replace lines 337-352 (index 336-351)
lines[336:352] = new_buttons

# Write back
with open(r'c:\Projects\murugdur1\client\src\pages\Home.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Done!")
