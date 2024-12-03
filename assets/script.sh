# Generer første siffer (1-9)
local base=$((RANDOM % 9 + 1))

# Generer de neste 7 sifrene (0-9)
for i in {1..7}; do
    base="${base}$((RANDOM % 10))"
done

# Vekter for kontrollsifferberegning
local weights=(3 2 7 6 5 4 3 2)
local sum=0

# Beregn sum av siffer * vekt
for i in {1..8}; do
    local digit=${base:$((i-1)):1}
    sum=$((sum + digit * weights[$i]))
done

# Beregn kontrollsiffer (modulus 11)
local control=$((11 - (sum % 11)))
# Hvis kontrollsifferet blir 11, settes det til 0
# Hvis det blir 10, er nummeret ugyldig og vi prøver på nytt
if [[ $control -eq 11 ]]; then
    control=0
elif [[ $control -eq 10 ]]; then
    orgnr
    return
fi

# Skriv ut hele organisasjonsnummeret
echo "${base}${control}"