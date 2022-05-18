import dash
from dash import html
from dash import dcc
import plotly.express as px
import plotly.graph_objects as go
from dash.dependencies import Output, Input
import dash_bootstrap_components as dbc
import dash.dash_table as dt
import researchpy as rp

# DS and ML libraries
import pandas as pd
import numpy as np
import pickle


# Same dashboard, this time with working sidebars

app = dash.Dash(external_stylesheets=[dbc.themes.BOOTSTRAP], suppress_callback_exceptions=True)

# styling the sidebar
SIDEBAR_STYLE = {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "bottom": 0,
    "width": "16rem",
    "padding": "2rem 1rem",
    "background-color": "#f8f9fa",
}

# padding for the page content
CONTENT_STYLE = {
    "margin-left": "18rem",
    "margin-right": "2rem",
    "padding": "2rem 1rem",
}

sidebar = html.Div(
    [
        html.H2("Better Health", className="display-4"),
        html.Hr(),
        html.P(
            "Hello Doc, which page do you want to view ? ", className="lead"
        ),
        dbc.Nav(
            [
                dbc.NavLink("Home Page", href="/", active="exact"),
                dbc.NavLink("Prediction", href="/page-2", active="exact"),
                dbc.NavLink("Database", href="/page-3", active="exact"),
            ],
            vertical=True,
            pills=True,
        ),
    ],
    style=SIDEBAR_STYLE,
)

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

card_symptoms = dbc.Card(
    [
        dbc.CardHeader('Patients with symptoms ?: '),
        dbc.CardBody(
            [
                html.P('6 % ')
            ]
        )
    ]
)

card_meds = dbc.Card(
    [
        dbc.CardHeader('Patients on meds: '),
        dbc.CardBody(
            [
                html.P('20 %')
            ]
        )
    ]
)

info_cards = dbc.CardDeck(
    [
        dbc.Col(card_age, width = 'auto'),
        dbc.Col(card_gender, width = 'auto'),
        dbc.Col(card_symptoms, width = 'auto'),
        dbc.Col(card_meds, width = 20),
    ],
)

# Data Frame
df = pd.read_csv('/Users/RyanMburu/Desktop/DS Projects/Thyroid Disease Detector/Datasets/clean_hypothyroid2.csv')
df2 = pd.read_csv('/Users/RyanMburu/Desktop/DS Projects/Thyroid Disease Detector/Datasets/modeling_hypothyroid.csv')
df_sample = pd.read_csv('Datasets/sample.csv')
df2.drop(columns=('Unnamed: 0'), axis = 1, inplace = True)
df_sample.drop(columns=('Unnamed: 0'), axis = 1, inplace = True)
df_sample = df_sample.sort_values(by = ['output'], ascending = False)

# Load the ml model
pickle_model = 'thyroid_model.pkl'

with open(pickle_model, 'rb') as file:
    forest_model = pickle.load(file)



#Dropdown 4 bar charts

df_controls_1 = df[['sex', 'on thyroxine', 'sick', 'thyroid surgery', 'referral source']]

controls_1_list = list(df_controls_1)

controls_1 = dbc.Card(
    [
        html.Div(
            [
                dbc.Label('Choose demographic : '),
                dcc.Dropdown(
                    id = 'controls_1_DD',
                    options=[{'label' : i, 'value':i} for i in controls_1_list],
                    value = 'sex',
                ),
            ]
        )
    ]
)

# Dropdown 4 Scatterplot

df_controls_2 = df[['TSH', 'FTI', 'TT4', 'T4U']]

controls_2_list = list(df_controls_2)

controls_2 = dbc.Card(
    [
        html.Div(
            [
                dbc.Label('Choose measurement : '),
                dcc.Dropdown(
                    id = 'controls_2_DD',
                    options=[{'label' : i, 'value':i} for i in controls_2_list],
                    value = 'TSH',
                ),
            ]
        )
    ]
)

# Form 4 user Input

name_input = dbc.Row(
    [
        dbc.Label('Patients Name : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'text', id = 'name', placeholder = 'Enter the patients name. One or two names:'
            ), width = 8,
        )
    ], className = 'mb-3'
)

age_input = dbc.Row(
    [
        dbc.Label('Patients Age : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'age', placeholder = 'Enter the patients Age : ', step = 1
            ), width = 8,
        )
    ], className = 'mb-3'
)

thyroxine_list = list(df2['on thyroxine'].unique())
thyroxine_input = dbc.Row(
    [
        dbc.Label('Is patient on thyroxine med : ', html_for='example-radios-row', width=4),
        dbc.Col(
            dbc.RadioItems(
                id='on_thyroxine', 
                options= [{'label' : i, 'value':i} for i in thyroxine_list],
            ),
            width=8,
        ),
    ], className='mb-3',
)

surgery_list = list(df2['thyroid surgery'].unique())
surgery_input = dbc.Row(
    [
        dbc.Label('Has patient had any surgery ? : ', html_for='example-radios-row', width=4),
        dbc.Col(
            dbc.RadioItems(
                id='surgery', 
                options= [{'label' : i, 'value':i} for i in surgery_list],
            ),
            width=8,
        ),
    ], className='mb-3',
)

TSH_input = dbc.Row(
    [
        dbc.Label('TSH Score : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'TSH', placeholder = 'Enter the patients TSH Score / Value : ', step = 0.01
            ), width = 8,
        )
    ], className = 'mb-3'
)

T3_input = dbc.Row(
    [
        dbc.Label('T3 Score : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'T3', placeholder = 'Enter the patients T3 Score / Value : ', step = 0.01
            ), width = 8,
        )
    ], className = 'mb-3'
)

TT4_input = dbc.Row(
    [
        dbc.Label('TT4 Score : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'TT4', placeholder = 'Enter the patients TT4 Score / Value : ', step = 0.01
            ), width = 8,
        )
    ], className = 'mb-3'
)

T4U_input = dbc.Row(
    [
        dbc.Label('T4U Score : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'T4U', placeholder = 'Enter the patients T4U Score / Value : ', step = 0.01
            ), width = 8,
        )
    ], className = 'mb-3'
)

FTI_input = dbc.Row(
    [
        dbc.Label('FTI Score : ', html_for='example-age-row', width=3),
        dbc.Col(
            dbc.Input(
                type = 'number', id = 'FTI', placeholder = 'Enter the patients FTI Score / Value : ', step = 0.01
            ), width = 8,
        )
    ], className = 'mb-3'
)


form = dbc.Form([name_input, age_input, thyroxine_input, surgery_input, TSH_input, T3_input, TT4_input, T4U_input, FTI_input])

content = html.Div(id="page-content", children=[], style=CONTENT_STYLE)

app.layout = html.Div([
    dcc.Location(id="url"),
    sidebar,
    content
])

# Sidebar callback

@app.callback(
    Output("page-content", "children"),
    [Input("url", "pathname")]
)
def render_page_content(pathname):
    if pathname == "/":
        return [
                html.H1('BETTER HEALTH ENT CLINIC'),
                html.Hr(),
                html.H5('Welcome to Better health ENT (Eyes Nose Throat) Clinic Dashboard. We specialize in hypothyroid disease.'),
                html.Br(),
                html.Hr(),
                html.H2('HYPOTHYROID DISEASE ANALYSIS'),
                html.Hr(),
                dbc.Row(
                    [
                        html.Div(
                            [info_cards]
                        )
                    ]
                ),
                html.Br(),
                html.Hr(),
                html.H2('Demographics of patients '),
                html.Hr(),
                dbc.Row(
                    [
                        dbc.Col(controls_1, md=4, width='auto'),
                        dbc.Col(dcc.Graph(id = 'bar graph control1')),
                    ], align = 'Center',
                ),
                html.Hr(),

                html.H2('Relationship between Outcome of Disease and selected value based on the Patients age'),
                html.Hr(),
                dbc.Row(
                    [
                        dbc.Col(controls_2, md=4, width='auto'),
                        dbc.Col(dcc.Graph(id = 'bar graph control2')),
                    ], align = 'Center',
                )
                    
                ]
    elif pathname == "/page-2":
        return [
                html.H1('HYPOTHYROID PREDICTOR '),
                html.Hr(),

                html.H5('To Note : '),
                html.P(' - 0 indicates False/No'),
                html.P(' - 1 indicates True/Yes'),
                html.Hr(),
                html.Br(),
                html.Div(
                    [
                        form
                    ]

                ),
                html.Br(),
                html.Hr(),
                html.H3('Patients Description '),
                html.Hr(),
                html.Div(
                    id='light_info',
                ),
                html.Br(),
                html.Hr(),
                html.Br(),
                html.H2('Outcome of Patients Disease : ...'),
                html.Br(),
                html.Hr(),
                html.Br(),
                html.Div(
                    id = 'result'
                ),
                html.Br(),
                html.Br(),
                html.Hr(),
                html.H4('The website uses a Machine Learning model to do prediction with an accuracy of : '),
                html.Hr(),
                html.Hr(),
                html.H6('98% Accuracy.')          

                
                ]
    elif pathname == '/page-3':
        return [
            html.H1('Record of patients in the Database '),
            html.Hr(),
            dbc.Table.from_dataframe(df_sample, striped=True, bordered=True, hover=True)

        ]
    # If the user tries to reach a different page, return a 404 message
    return dbc.Jumbotron(
        [
            html.H1("404: Not found", className="text-danger"),
            html.Hr(),
            html.P(f"The pathname {pathname} was not recognised..."),
        ]
    )

# First bar chart callback

@app.callback(
    Output('bar graph control1', 'figure'),
    Input('controls_1_DD', 'value')
)

def bar(column):
    df_new = df_controls_1[[column]].value_counts().reset_index()
    df_new.rename(columns={0 : 'Sum of patients'}, inplace=True)
    
    plot = px.bar(df_new, x=column, y='Sum of patients', color=column)
    return plot


# Second scatter 
@app.callback(
    Output('bar graph control2', 'figure'),
    Input('controls_2_DD', 'value')
)


def bar(column2):
    
    plot2 = px.scatter(df, x='age', y=column2, color = 'output')
    return plot2


#Patient description callback
@app.callback(
    Output('light_info', 'children'),
    Input('name', 'value')
)

def info(name):
    return u'You have put in details of, {} , and his/her diagnosis is ready...'.format(name)


# Prediction callback
@app.callback(
    Output('result', 'children'),
    Input('age', 'value'),
    Input('on_thyroxine', 'value'),
    Input('surgery', 'value'),
    Input('TSH', 'value'),
    Input('T3', 'value'),
    Input('TT4', 'value'),
    Input('T4U', 'value'),
    Input('FTI', 'value'),

)

def prediction(age, on_thyroxine, surgery, TSH, T3, TT4, T4U, FTI):
    X = np.array([age, on_thyroxine, surgery, TSH, T3, TT4, T4U, FTI]).reshape(1, -1)

    Diagnosis = forest_model.predict(X)

    # return  u'{}'.format(Diagnosis)

    if Diagnosis == [1] :
        return [u'The patient tests POSITIVE of thyroid disease. Please follow the necessary procedures to enusres the patients treatment']
    elif Diagnosis == [0] :
        return [u'The patient tests NEGATIVE of thyroid disease. You might need to run more examinations on the patient to identify where the problem is and ensure the patient is treated']



if __name__=='__main__':
    app.run_server(debug=True, port=3000)