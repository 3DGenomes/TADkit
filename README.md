<img src="https://github.com/3DGenomes/TADkit/raw/master/doc/logo/tadkit-logo-title.png" width="240" >

TADkit is a HTML5 and JavaScript-based 3D genome browser. It makes use of D3.js for rendering the 1D and 2D tracks and WebGl by Three.js for rendering the 3D track.

##Description
TADkit creates interactive 3D representations of chromatin conformations modeled from 3C-based interaction matrices. 
The user can overlay 1D and 2D tracks of genomic data to these 3D views to directly evaluate the relationship 
between the 3D structure of the genome and its biological function.

##Documentation
###Instalation
To install TADkit in your server or locally, you need to download the repository and move the "tadkit" folder 
in your desired directoy. Next, point your browser to the index.html file in that directory. If you want to install it
locally you'll need to use Chrome local version by...

###How to use it
Visualization of 3D models and overlaying of data for analysis in TADkit is achieved in three simple steps. (1) The user may import a [TADbit](http://3Dgenomes.org/tadbit/) JSON file by using the drop-in area or the file menu in the TADkit main page. (2) The user is presented with an overview of the data. Each 3D model cluster is shown as an ensemble of grey strands, with its centroid model highlighted. After selecting a cluster, the browser view opens (see figure below) with a 3D scene of the centroid of the selected cluster, along with “classic” genomic tracks. (3) Finally, the user may add additional genomic tracks to the browser by inputting them using BigWig or BedGraph formats.

.. image:: https://github.com/3DGenomes/TADkit/raw/master/doc/logo/tadkit-logo-title.png
   :height: 50
   :width: 240

The browser view is composed by scene and track components that form a storyboard and is headed by a toolbar with the model title, internal navigation links, data input link and the current genomic position. The default storyboard layout has a scene at the top for the rendering of the 3D models, which can be represented as contiguous spheres or a chromatin “fiber”. The right panel of the 3D scene shows gene information located in the viewpoint of the 3D model. Below the 3D scene are stacked “classical” tracks showing: the genes found in the region covered by the current model (automatically fetched using the Ensembl REST API8); a linear depiction of the 3D proximity from the selected viewpoint to the rest of the model; and a graph of the restraints imposed during modeling. Moreover, additional tracks can be imported by either referencing external sources or by using local user data sets in BigWig or BedGraph formats.

