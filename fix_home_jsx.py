import os

file_path = r'c:\Projects\murugdur1\client\src\pages\Home.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if '{/* Filter Buttons - For Her / For Him */}' in line:
        new_lines.append(line)
        new_lines.append('                    <div className="flex justify-center items-center gap-4 mt-12">\n')
        new_lines.append('                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\n')
        new_lines.append('                            For Her\n')
        new_lines.append('                        </button>\n')
        new_lines.append('                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\n')
        new_lines.append('                            For Him\n')
        new_lines.append('                        </button>\n')
        new_lines.append('                    </div>\n')
        skip = True
        continue
    
    if skip:
        if '</div>' in line and i > 0 and '</div>' in lines[i-1] and 'section' not in line:
            # This is likely the end of the div we are skipping
            # Actually, let's look for the next section or something else
            pass
        if '</div>' in line and '</div>' in lines[i+1] and '</section>' in lines[i+2]:
             skip = False
             continue
        continue
        
    new_lines.append(line)

# Let's try a simpler approach: replace the whole block between the comment and the end of the div
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '{/* Filter Buttons - For Her / For Him */}' in line:
        start_idx = i
    if start_idx != -1 and '</div>' in line and i + 2 < len(lines) and '</div>' in lines[i+1] and '</section>' in lines[i+2]:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    final_lines = lines[:start_idx+1]
    final_lines.append('                    <div className="flex justify-center items-center gap-4 mt-12">\n')
    final_lines.append('                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\n')
    final_lines.append('                            For Her\n')
    final_lines.append('                        </button>\n')
    final_lines.append('                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">\n')
    final_lines.append('                            For Him\n')
    final_lines.append('                        </button>\n')
    final_lines.append('                    </div>\n')
    final_lines.extend(lines[end_idx+1:])
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    print("Success")
else:
    print(f"Failed to find markers: start={start_idx}, end={end_idx}")
