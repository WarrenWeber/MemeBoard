# -*- coding: utf-8 -*-
"""
Created on Wed Mar 17 23:35:47 2021

@author: wiiri
"""
import json

data_out = {}
data_out['memes'] = []
data_out['categories'] = []

with open('C:\DevWeb\MemeBoard\db\meme.json', 'r') as file_in: 
    id_meme = 1
    id_category = 1
    
    data_in = json.load(file_in)
    for item in data_in:
        title = item['donnees']['name']
        file = item['image'].split('/')[-1]
        date = (item['donnees']['Year'] if ('Year' in item['donnees'] and (item['donnees']['Year']).isnumeric()) else "1900") + "-01-01T00:00:00.000Z"
        category = item['donnees']['Type'] if ('Type' in item['donnees']) else None
        tags = item['donnees']['Tags']
        
        category = 'Random' if category in [None, 'null', ''] else category
        
        data_out['memes'].append({
            'id': id_meme,
            'title': title,
            'file': file,
            'date': date,
            'category': category,
            'tags': tags,
            'votes': 0
        })
        
        if not category in data_out['categories'] and not category in [None, 'null', '']:
            data_out['categories'].append(category)
        
        id_meme += 1

data_out['categories'].sort()

with open('C:\DevWeb\MemeBoard\db\memes.json', 'w') as file_out:
    json.dump(data_out, file_out, indent=4)