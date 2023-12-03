# SPDX-License-Identifier: MIT

# Advent of Code 2023
# --- Day 1: Trebuchet?! ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

function part_one(input::String)
    ans = 0
    for line in readlines(input)
        digits = filter(isdigit, line)
        ans += parse(Int, join([digits[begin], digits[end]]))
    end
    return ans
end

println(part_one("input_part_one.txt"))

function part_two(input::String)
    ans = 0
    nums = Dict(
        "zero" => 0,
        "one" => 1,
        "two" => 2,
        "three" => 3,
        "four" => 4,
        "five" => 5,
        "six" => 6,
        "seven" => 7,
        "eight" => 8,
        "nine" => 9,
    )
    pattern = r"(zero|one|two|three|four|five|six|seven|eight|nine|\d)"
    for line in readlines(input)
        digits = findall(pattern, line; overlap = true)
        first_digit =
            all(isletter, line[digits[begin]]) ? nums[line[digits[begin]]] :
            parse(Int, line[digits[begin]])
        last_digit =
            all(isletter, line[digits[end]]) ? nums[line[digits[end]]] :
            parse(Int, line[digits[end]])
        ans += parse(Int, join([first_digit, last_digit]))
    end
    return ans
end

println(part_two("input_part_two.txt"))
