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

# Information Cards

card_age = dbc.Card(
    [
        dbc.CardHeader('Most Affected Age Group : '),
        dbc.CardBody(
            [
                html.P('50 - 55 Years')
            ]
        )
    ]
)

card_gender = dbc.Card(
    [
        dbc.CardHeader('Most Affected Gender: '),
        dbc.CardBody(
            [
                html.P('Female')
            ]
        )
    ]
)

info_cards = dbc.CardDeck(
    [
        dbc.Col(card_age, width = 'auto'),
        dbc.Col(card_gender, width = 'auto')
    ],
)

app.layout = dbc.Container(
    [
        html.H1('HYPOTHYROID DISEASE ANALYSIS'),
        html.Hr(),
        dbc.Row(
            [
                html.Div(
                    [
                        info_cards
                    ]
                ),
            ]
        ),
        html.Br(),
    ]
)

# Call the app
if __name__ == '__main__':
    app.run_server(debug=True, dev_tools_ui=False)