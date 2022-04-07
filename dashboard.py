# Dash Libraries
import dash
from dash import Dash, html, dcc
import plotly.express as px
import plotly.graph_objects as go
from dash.dependencies import Output, Input
import dash_bootstrap_components as dbc
import researchpy as rp

# DS and ML libraries
import pandas as pd
import numpy as np


# Application initialization
app = dash.Dash(external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout for initial website
app.layout = html.Div(children = [
    html.H1('GENERIC HOSPITAL',
    style = {
        'textAlign' : 'center'
    })
])

# Call the app
if __name__ == '__main__':
    app.run_server(debug=True, dev_tools_ui=False)