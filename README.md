This program is a proof-of-concept for a site designed to assist the user in researching and gathering the necessary information to purchase a vehicle or find out information about any vehicle. The site consists of 5 pages: index.html, reviews.html, recalls.html, search.html, and about.html. Each page has its own dedicated JavaScript page, titled the same as its corresponding html page. That is, recalls.js is for the recalls.html page, about.js is for the about.html page, and so on. 

Because this site is desgined to be a proof-of-concept, it does not contain all of the functionality that it would had it been a full-on deployable website open to the public. All the error checking on all the pages is functional, however, so all that's needed is to hook up the site to a proper back end/ server set up and it'll be a fully functioning web site.

IMPORTANT  NOTES: 

1) The recall.html page is currently connected to the pokemon API. It is functional, and returns 6 data items from the API. Therefore, to return data, the names of Pokemon characters must be entered (i.e., pikachu, ditto, scyther,etc.).
2) To enable the (fully functional) VIN error checking on the recall.html page, do as follows: 
    a) Remove the "/*" from line 27 and place it in front of " */ " on line 32. 
    b) Move the " // " in front of "vinSearchTerm" on line 37 and place in front of "vinSearchTerm" on line 38.
    c) Add a " /* " in front of the word "fetch" on line 40.
    d) Add a " */ " on line 90.
    e) Add a " // " in front of "pictureDiv..." on line 101.
    f) Remove the " /* " from in front of "function....." on line 107 and place it in front of the " */ " on line 139.

3) To enble the API and disable the VIN error checking, do number 2 above in reverse.