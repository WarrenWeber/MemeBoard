# -*- coding: utf-8 -*-
"""
Created on Wed Mar 17 23:35:47 2021

@author: wiiri
"""
import json

data_out = {}
data_out['memes'] = []

with open('C:\DevWeb\MemeBoard\db\meme.json', 'r') as file_in: 
    id = 1
    data_in = json.load(file_in)
    for item in data_in:
        title = item['donnees']['name']
        file = item['image'].split('/')[-1]
        date = item['donnees']['Year']
        category = item['donnees']['Type'] if ('Type' in item['donnees']) else None
        tags = item['donnees']['Tags']
        
        data_out['memes'].append({
            'id': id,
            'title': title,
            'file': file,
            'date': date,
            'category': category,
            'tags': tags
        })
        id += 1
        
with open('C:\DevWeb\MemeBoard\db\memes.json', 'w') as file_out:
    json.dump(data_out, file_out, indent=4)