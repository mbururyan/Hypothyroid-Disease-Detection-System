# Dash Libraries
import dash
from dash import html
from dash import dcc
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

app.layout = dbc.Container(
    [
        html.H1('HYPOTHYROID DISEASE ANALYSIS'),
        html.Hr()
    ]
)

# Call the app
if __name__ == '__main__':
    app.run_server(debug=True, dev_tools_ui=False)