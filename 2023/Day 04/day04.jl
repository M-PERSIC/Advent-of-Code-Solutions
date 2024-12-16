# SPDX-License-Identifier: MIT

# Advent of Code 2023
# --- Day 4: Scratchcards ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

function part_one(input::String)
    total = 0
    for line in readlines(input)
        winning_nums, personal_nums = split(line, "|")
        winning_nums =
            parse.(
                Int,
                filter(x -> all(isdigit, x) && !isempty(x), split(winning_nums, " ")),
            )
        personal_nums =
            parse.(
                Int,
                filter(x -> all(isdigit, x) && !isempty(x), split(personal_nums, " ")),
            )
        winning_nums_count = length([x for x in personal_nums if x in winning_nums])
        total += winning_nums_count <= 0 ? 0 : 2^(winning_nums_count - 1)
    end
    return total
end

println(part_one("input_part_one.txt"))

# TODO
function part_two(input::String)
    total = 0
    for line in readlines(input)
        winning_nums =
            parse.(
                Int,
                filter(x -> all(isdigit, x) && !isempty(x), split(winning_nums, " ")),
            )
        personal_nums =
            parse.(
                Int,
                filter(x -> all(isdigit, x) && !isempty(x), split(personal_nums, " ")),
            )
        winning_nums_count = length([x for x in personal_nums if x in winning_nums])

    end
    return total
end

# println(part_two("input_part_two.txt"))
