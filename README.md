# Search school backend
##Objective
#####Create an API that would enable a front-end to display the data in tabular format with the following features
   
2. Search : Create a search field that can search over schoolname|address|area|pincode|landmark
3. Sort : Upon clicking the title of the column in the table sort that field. [Min field to sort : Name, Pincode, medium_of_inst]
4. Filter : Create a dynamic filtering option based on the available list of schools.
           Field for filter : category | gender | medium_of_inst
           Note : Suppose category has 3 different values and a search is applied and the output has only 2 types of category,
                   In this case, only two filters should be shown
5. Google Map Integration: Upon clicking on the school, Use the latlong value to show a point in the map that represents the school's location

##Approach
1. Converted the CSV file to JSON data.
2. Imported the JSON data to MongoDB using mongoimport commonad.
3. Created the generalised API for searching based on the search parameter and search text (both of which needed to be passed from the frontend in JSON format in the body). This allows a generalised search on any field. For restricting the search on given fields, we can pre-check if the search parameter in among the allowed parameters.   
4. Created the API to sort the result. The user need to pass the field on which sorting has to performed along with the sorting type i.e, accending or decending. Again developed the generalised version and sorting could be applied on any of the fields. 
5. Created an API for filtering options. The user need to pass a filter JSON with the filter parameter and filter value. It can also pass the empty filter JSON which will reterive all the results. Again, it can be used to apply number of filters.
6. Google Map integration. Removed the API key because of billing. 

##Request
1. There is an attached postman collection to demonstrate the required parameter to be passed and the output obtained.
2. There is also small installed package list to demonstrate which package to be used.
3. ENV file to store any environment variables. 
4. Data is also attached in JSON format
5. Removed the node modules folder. Can be installed by running npm install.# backend
