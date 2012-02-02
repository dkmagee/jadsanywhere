jADSAnywhere
============

jADSAnywhere is a simple `jQuery`_ plugin for integrating publications
listed in the `SAO/NASA Astrophysical Data System`_ (ADS) Digital
Library service into any webpage. By adding just a few lines of
Javascript and HTML code you can display a listing of your publications
listed on ADS. For a demonstration see `Demo 1`_ & `Demo 2`_.

Features
~~~~~~~~

-  Displays publications based on an authors’ name
-  Displays publication from an ADS private library give the library ID
   and name
-  Displays (by default) the title, author list, abstract, journal name
   and a link to the ADS page for each publication
-  Customize the style and layout with your own stylesheets
-  Overwrite the default generated HTML markup by providing your own
   simple formatter
-  Does not interrupt the loading of your page
-  Small code size

How do I use it?
~~~~~~~~~~~~~~~~

#. `Download`_ jADSAnywhere or just use my hosted version (see code
   below)
#. Add the Javascript to your page’s ``<head>`` section
#. Download the `jQuery library`_ (1.4.2) or just use the Google hosted
   version (see code below)
#. Add a placeholder in your page where you want the publications to
   display

Example Usage
~~~~~~~~~~~~~

Place this code in the ``<head>`` section of your HTML document and
change the search string ``'LastName, FirstName MiddleInitial'`` to your
name (e.g for myself it would be ``'Magee, Daniel K'``).

::
    
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://cdn.danielkmagee.com/jquery.jadsanywhere.min.js"></script>
    <script type="text/javascript">
    $(function(){
    $('#publications').jADSAnywhere('LastName, FirstName MiddleInitial');
    });
    </script>

Place this code anywhere in the ``<body>`` section of your HTML
document.

::

    <div id="publications">
    <h2>Publications</h2>
    </div>

For a demonstration of this example see `Demo 1`_. See `Demo 2`_ for a
example of using a ADS private library.

Options
~~~~~~~

+----------------------+-----------------+---------------------------------------------------------------------------------+
| Option               | Default Value   | Usage                                                                           |
+======================+=================+=================================================================================+
| ``limit``            | ``20``          | Limit the number of publications returned                                       |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``privateLib``       | ``null``        | ADS private library ID.                                                         |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``privateLibName``   | ``null``        | ADS private library name                                                        |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``astroDB``          | ``true``        | Include search results from Astronomy and Astrophysics bibliographic database   |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``physicsDB``        | ``true``        | Include search results from Physics bibliographic database                      |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``arxivDB``          | ``true``        | Include search results from arXiv e-prints bibliographic database               |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``pubYearStart``     | ``null``        | Return search results starting with year                                        |
+----------------------+-----------------+---------------------------------------------------------------------------------+
| ``pubYearEnd``       | ``null``        | Return search results ending in year                                            |
+----------------------+-----------------+---------------------------------------------------------------------------------+

License
~~~~~~~

jADSAnywhere is `beer-ware`_. If we meet some day, and you think this
stuff is worth it, you can buy me a beer in return.

Feedback, Support, Complaints…
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Email me — magee at ucolick dot org

.. _jQuery: http://jquery.com/
.. _SAO/NASA Astrophysical Data System: http://www.adsabs.harvard.edu/
.. _Demo 1: http://www.ucolick.org/~magee/jadsanywhere/demo/demo1.html
.. _Demo 2: http://www.ucolick.org/~magee/jadsanywhere/demo/demo1.html
.. _Download: http://www.ucolick.org/~magee/jadsanywhere/jADSAnywhere.zip
.. _jQuery library: http://jquery.com/
.. _beer-ware: http://en.wikipedia.org/wiki/Beerware