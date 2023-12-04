# SPDX-License-Identifier: MIT

# Advent of Code 2023
# --- Day 3: Gear Ratios ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

# TODO
function part_one(input::String)
    sum = 0
    shape = (count("\n", lines) + 1, findfirst(r"\n", lines)[begin] - 1)
    newlines_removed = collect(replace(lines, "\n" => "")) 
    char_matrix = permutedims(reshape(newlines_removed, shape))
    for i in eachindex(char_matrix)
        sum += parse(Int, num)
        is_part_number = false
        num = ""
        try
            
        catch BoundsError
            continue
        end
    end
    return sum
end

# println(part_one("input_part_one.txt"))

# TODO 
function part_two(input::String)
end

# println(part_two("input_part_two.txt"))
