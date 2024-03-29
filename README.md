![TADkit Logo](https://raw.githubusercontent.com/3DGenomes/TADkit/master/resources/logo/tadkit-logo-title.png)

![Release](https://img.shields.io/github/release/3DGenomes/TADkit.svg)
![License](https://img.shields.io/github/license/3DGenomes/TADkit.svg)

<br />
![AngularJS](https://img.shields.io/badge/AngularJS-1.6.10-red.svg)
![Three.js](https://img.shields.io/badge/Three.js-v0.97.0-orange.svg)


### **Unfortunately we have ceased the development and maintenance of TADkit**


TADkit is a HTML5 and JavaScript-based 3D genome browser. It makes use of D3.js for rendering the 1D and 2D tracks and WebGl by Three.js for rendering the 3D track.

TADkit is currently developed at the [MarciusLab](http://www.marciuslab.org) with the contributions of Mike Goodstadt, David Castillo and many maembers of our Lab.

##Description
TADkit creates interactive 3D representations of chromatin conformations modeled from 3C-based interaction matrices. 
The user can overlay 1D and 2D tracks of genomic data to these 3D views to directly evaluate the relationship 
between the 3D structure of the genome and its biological function.

##Documentation
###Instalation
To install TADkit in your server or locally, you need to download the repository and move the "tadkit" folder 
in your desired directoy. Next, point your browser to the index.html file in that directory. If you want to install it
locally you'll need to use Chrome with the flag "--allow-file-access-from-files" to run JavaScript locally (additional information for other Internet browsers [here](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally).

###How to use it
Visualization of 3D models and overlaying of data for analysis in TADkit is achieved in three simple steps. (1) The user may import a [TADbit](http://3Dgenomes.org/tadbit/) JSON file by using the drop-in area or the file menu in the TADkit main page. (2) The user is presented with an overview of the data. Each 3D model cluster is shown as an ensemble of grey strands, with its centroid model highlighted. After selecting a cluster, the browser view opens (see figure below) with a 3D scene of the centroid of the selected cluster, along with “classic” genomic tracks. (3) Finally, the user may add additional genomic tracks to the browser by inputting them using BigWig or BedGraph formats.

![Browser View](https://raw.githubusercontent.com/3DGenomes/TADkit/master/resources/screenshots/tadkit_scene.png)

The browser view is composed by: 
* a. Top toolbar with the model title, internal navigation links, data input link and the current genomic position.
* b. 3D rendering of chromatin as contiguous spheres or a chromatin “fiber”. 
* c. Gene information located in the viewpoint of the 3D model.
* d. Detailed information for the selected locus.
* e. Stacked “classical” tracks showing: 
  * The genes found in the region covered by the current model (automatically fetched using the Ensembl REST API).
  * A linear depiction of the 3D proximity from the selected viewpoint to the rest of the model.
  * A graph of the restraints imposed during modeling (blue for repulsive and red for attacting restraints). 
  * Additional user-imported tracks.

