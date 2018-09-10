'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">tadkit-a2 documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AppTadkitModule.html" data-type="entity-link">AppTadkitModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppTadkitModule-686eb5a180638c36609a27f0a9fda2ee"' : 'data-target="#xs-components-links-module-AppTadkitModule-686eb5a180638c36609a27f0a9fda2ee"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppTadkitModule-686eb5a180638c36609a27f0a9fda2ee"' : 'id="xs-components-links-module-AppTadkitModule-686eb5a180638c36609a27f0a9fda2ee"' }>
                                        <li class="link">
                                            <a href="components/AppTadkitComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppTadkitComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TkLayoutModule.html" data-type="entity-link">TkLayoutModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TkLayoutModule-b8ca20d0c00bcfd732c5b37a3d62ded5"' : 'data-target="#xs-components-links-module-TkLayoutModule-b8ca20d0c00bcfd732c5b37a3d62ded5"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TkLayoutModule-b8ca20d0c00bcfd732c5b37a3d62ded5"' : 'id="xs-components-links-module-TkLayoutModule-b8ca20d0c00bcfd732c5b37a3d62ded5"' }>
                                        <li class="link">
                                            <a href="components/TkFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkFooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkHeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkMenuComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkSidebarComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TkProjectsModule.html" data-type="entity-link">TkProjectsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TkProjectsModule-3ab10ce6a04bdf5c6b1da7da34f4aedc"' : 'data-target="#xs-components-links-module-TkProjectsModule-3ab10ce6a04bdf5c6b1da7da34f4aedc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TkProjectsModule-3ab10ce6a04bdf5c6b1da7da34f4aedc"' : 'id="xs-components-links-module-TkProjectsModule-3ab10ce6a04bdf5c6b1da7da34f4aedc"' }>
                                        <li class="link">
                                            <a href="components/TkProjectBriefComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkProjectBriefComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkProjectCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkProjectCreateComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkProjectDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkProjectDetailsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkProjectsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkProjectsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkProjectsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkProjectsListComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TkWorkspaceModule.html" data-type="entity-link">TkWorkspaceModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TkWorkspaceModule-e6b159ae238c92fa367bd2d09309df18"' : 'data-target="#xs-components-links-module-TkWorkspaceModule-e6b159ae238c92fa367bd2d09309df18"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TkWorkspaceModule-e6b159ae238c92fa367bd2d09309df18"' : 'id="xs-components-links-module-TkWorkspaceModule-e6b159ae238c92fa367bd2d09309df18"' }>
                                        <li class="link">
                                            <a href="components/TkGenomicsInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkGenomicsInfoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkGenomicsMatrixComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkGenomicsMatrixComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkGenomicsSpatialComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkGenomicsSpatialComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkGenomicsTracksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkGenomicsTracksComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TkWorkspaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TkWorkspaceComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WorkspaceWidgetSpawnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkspaceWidgetSpawnerComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/TkGenomicsInfoComponent.html" data-type="entity-link">TkGenomicsInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkGenomicsMatrixComponent.html" data-type="entity-link">TkGenomicsMatrixComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkGenomicsSpatialComponent.html" data-type="entity-link">TkGenomicsSpatialComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkGenomicsTracksComponent.html" data-type="entity-link">TkGenomicsTracksComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkProjectBriefComponent.html" data-type="entity-link">TkProjectBriefComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkProjectCreateComponent.html" data-type="entity-link">TkProjectCreateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkProjectDetailsComponent.html" data-type="entity-link">TkProjectDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TkProjectsListComponent.html" data-type="entity-link">TkProjectsListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkspaceWidgetSpawnerComponent.html" data-type="entity-link">WorkspaceWidgetSpawnerComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/Axis.html" data-type="entity-link">Axis</a>
                    </li>
                    <li class="link">
                        <a href="classes/Chromatin.html" data-type="entity-link">Chromatin</a>
                    </li>
                    <li class="link">
                        <a href="classes/Chromatin-1.html" data-type="entity-link">Chromatin</a>
                    </li>
                    <li class="link">
                        <a href="classes/Cluster.html" data-type="entity-link">Cluster</a>
                    </li>
                    <li class="link">
                        <a href="classes/Cluster-1.html" data-type="entity-link">Cluster</a>
                    </li>
                    <li class="link">
                        <a href="classes/Clusters.html" data-type="entity-link">Clusters</a>
                    </li>
                    <li class="link">
                        <a href="classes/Colorsets.html" data-type="entity-link">Colorsets</a>
                    </li>
                    <li class="link">
                        <a href="classes/Coordinate.html" data-type="entity-link">Coordinate</a>
                    </li>
                    <li class="link">
                        <a href="classes/Current.html" data-type="entity-link">Current</a>
                    </li>
                    <li class="link">
                        <a href="classes/Cytogenic.html" data-type="entity-link">Cytogenic</a>
                    </li>
                    <li class="link">
                        <a href="classes/Dataset.html" data-type="entity-link">Dataset</a>
                    </li>
                    <li class="link">
                        <a href="classes/Dependencies.html" data-type="entity-link">Dependencies</a>
                    </li>
                    <li class="link">
                        <a href="classes/Dependency.html" data-type="entity-link">Dependency</a>
                    </li>
                    <li class="link">
                        <a href="classes/Ensemble.html" data-type="entity-link">Ensemble</a>
                    </li>
                    <li class="link">
                        <a href="classes/Experiment.html" data-type="entity-link">Experiment</a>
                    </li>
                    <li class="link">
                        <a href="classes/Frustum.html" data-type="entity-link">Frustum</a>
                    </li>
                    <li class="link">
                        <a href="classes/Geometries.html" data-type="entity-link">Geometries</a>
                    </li>
                    <li class="link">
                        <a href="classes/Geometry.html" data-type="entity-link">Geometry</a>
                    </li>
                    <li class="link">
                        <a href="classes/GridLocation.html" data-type="entity-link">GridLocation</a>
                    </li>
                    <li class="link">
                        <a href="classes/GridTemplate.html" data-type="entity-link">GridTemplate</a>
                    </li>
                    <li class="link">
                        <a href="classes/Lighting.html" data-type="entity-link">Lighting</a>
                    </li>
                    <li class="link">
                        <a href="classes/Metadata.html" data-type="entity-link">Metadata</a>
                    </li>
                    <li class="link">
                        <a href="classes/Model.html" data-type="entity-link">Model</a>
                    </li>
                    <li class="link">
                        <a href="classes/ModelRefs.html" data-type="entity-link">ModelRefs</a>
                    </li>
                    <li class="link">
                        <a href="classes/Models.html" data-type="entity-link">Models</a>
                    </li>
                    <li class="link">
                        <a href="classes/Navigation.html" data-type="entity-link">Navigation</a>
                    </li>
                    <li class="link">
                        <a href="classes/Networks.html" data-type="entity-link">Networks</a>
                    </li>
                    <li class="link">
                        <a href="classes/Occupancy.html" data-type="entity-link">Occupancy</a>
                    </li>
                    <li class="link">
                        <a href="classes/Overlay.html" data-type="entity-link">Overlay</a>
                    </li>
                    <li class="link">
                        <a href="classes/Palette.html" data-type="entity-link">Palette</a>
                    </li>
                    <li class="link">
                        <a href="classes/Particles.html" data-type="entity-link">Particles</a>
                    </li>
                    <li class="link">
                        <a href="classes/Particles-1.html" data-type="entity-link">Particles</a>
                    </li>
                    <li class="link">
                        <a href="classes/Project.html" data-type="entity-link">Project</a>
                    </li>
                    <li class="link">
                        <a href="classes/Projects.html" data-type="entity-link">Projects</a>
                    </li>
                    <li class="link">
                        <a href="classes/Region.html" data-type="entity-link">Region</a>
                    </li>
                    <li class="link">
                        <a href="classes/RegionCytogenic.html" data-type="entity-link">RegionCytogenic</a>
                    </li>
                    <li class="link">
                        <a href="classes/Regions.html" data-type="entity-link">Regions</a>
                    </li>
                    <li class="link">
                        <a href="classes/Restraint.html" data-type="entity-link">Restraint</a>
                    </li>
                    <li class="link">
                        <a href="classes/Restraints.html" data-type="entity-link">Restraints</a>
                    </li>
                    <li class="link">
                        <a href="classes/Setting.html" data-type="entity-link">Setting</a>
                    </li>
                    <li class="link">
                        <a href="classes/Settings.html" data-type="entity-link">Settings</a>
                    </li>
                    <li class="link">
                        <a href="classes/Species.html" data-type="entity-link">Species</a>
                    </li>
                    <li class="link">
                        <a href="classes/Swatch.html" data-type="entity-link">Swatch</a>
                    </li>
                    <li class="link">
                        <a href="classes/Swatches.html" data-type="entity-link">Swatches</a>
                    </li>
                    <li class="link">
                        <a href="classes/TkAbstractWidget.html" data-type="entity-link">TkAbstractWidget</a>
                    </li>
                    <li class="link">
                        <a href="classes/Tuple.html" data-type="entity-link">Tuple</a>
                    </li>
                    <li class="link">
                        <a href="classes/Tuples.html" data-type="entity-link">Tuples</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
                    <li class="link">
                        <a href="classes/Users.html" data-type="entity-link">Users</a>
                    </li>
                    <li class="link">
                        <a href="classes/Widget.html" data-type="entity-link">Widget</a>
                    </li>
                    <li class="link">
                        <a href="classes/Widget-1.html" data-type="entity-link">Widget</a>
                    </li>
                    <li class="link">
                        <a href="classes/Widget3D.html" data-type="entity-link">Widget3D</a>
                    </li>
                    <li class="link">
                        <a href="classes/Widgets.html" data-type="entity-link">Widgets</a>
                    </li>
                    <li class="link">
                        <a href="classes/Workspace.html" data-type="entity-link">Workspace</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TkProjectsService.html" data-type="entity-link">TkProjectsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TkProjectsService-1.html" data-type="entity-link">TkProjectsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TkWorkspaceService.html" data-type="entity-link">TkWorkspaceService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/WidgetComponent.html" data-type="entity-link">WidgetComponent</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
