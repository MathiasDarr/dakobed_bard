import json

my_dict_list = [{'a':'dfa'},{'a':'bxcc', "Args":["Hello", "Folla"]}]

with open("sample.json", "w") as outfile:
    json.dump(my_dict_list, outfile)
